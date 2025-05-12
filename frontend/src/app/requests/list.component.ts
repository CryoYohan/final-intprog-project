import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { RequestService, AlertService, AccountService, EmployeeService } from '@app/_services';
import { Role, Employee } from '@app/_models';
declare var bootstrap: any;

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    requests: any[] = [];
    loading = false;
    isAdmin = false;
    selectedRequest: any = null;
    deleteModal: any;
    isDeleting = false;
    expandedItems: { [key: string]: boolean } = {}; // Track expanded state for each request
    itemsPerRow = 2; // Number of items to show initially
    employeeId: string | null = null;
    notFound = false;
    employee: Employee | null = null; // Added employee property

    constructor(
        private requestService: RequestService,
        private alertService: AlertService,
        private accountService: AccountService,
        private employeeService: EmployeeService, // Added EmployeeService
        private route: ActivatedRoute
    ) {
        this.isAdmin = this.accountService.accountValue?.role === Role.Admin;
        
        // Get employeeId from query params
        this.route.queryParams.subscribe(params => {
            this.employeeId = params['employeeId'];
            if (this.employeeId) {
                this.loadEmployee(); // Load employee details first
                this.loadRequests();
            } else {
                this.notFound = false;
                this.employee = null; // Reset employee when no employeeId is provided
                this.loadRequests();
            }
        });
    }

    ngOnInit() {
        this.loadRequests();
        this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    }

    // Load employee details
    private loadEmployee() {
        if (!this.employeeId) return;
        
        this.employeeService.getById(this.employeeId)
            .pipe(first())
            .subscribe({
                next: (employee) => {
                    this.employee = employee;
                },
                error: error => {
                    this.alertService.error(error);
                }
            });
    }

    // Get formatted employee full name with capitalized first letters
    getEmployeeFullName(): string {
        if (!this.employee?.account?.firstName || !this.employee?.account?.lastName) return '';
        
        const firstName = this.employee.account.firstName.charAt(0).toUpperCase() + 
                         this.employee.account.firstName.slice(1).toLowerCase();
        const lastName = this.employee.account.lastName.charAt(0).toUpperCase() + 
                        this.employee.account.lastName.slice(1).toLowerCase();
        return `${firstName} ${lastName}`;
    }

    private loadRequests() {
        this.loading = true;
        this.notFound = false;
        if (this.employeeId) {
            // Load requests for specific employee
            this.requestService.getByEmployeeId(this.employeeId)
                .pipe(first())
                .subscribe({
                    next: (requests: any) => {
                        this.requests = requests || [];
                        this.notFound = !requests || requests.length === 0;
                        this.loading = false;
                        
                        if (this.notFound) {
                            this.alertService.info("No data found");
                        }
                    },
                    error: error => {
                        if (error.status === 404 || error.toLowerCase?.().includes('not found')) {
                            this.notFound = true;
                            this.alertService.info("No data found");
                        } else {
                        this.alertService.error(error);
                        }
                        this.loading = false;
                    }
                });
        } else {
            // Load all requests
            this.requestService.getAll()
                .pipe(first())
                .subscribe({
                    next: (requests: any) => {
                        this.requests = requests || [];
                        this.notFound = !requests || requests.length === 0;
                        this.loading = false;
                        
                        if (this.notFound) {
                            this.alertService.info("No data found");
                        }
                    },
                    error: error => {
                        if (error.status === 404 || error.toLowerCase?.().includes('not found')) {
                            this.notFound = true;
                            this.alertService.info("No data found");
                        } else {
                        this.alertService.error(error);
                        }
                        this.loading = false;
                    }
                });
        }
    }

    // Get visible items for a request
    getVisibleItems(request: any): string[] {
        if (!request.items || request.items.length === 0) return [];
        
        const items = request.items;
        const isExpanded = this.expandedItems[request.id];
        const visibleCount = isExpanded ? items.length : this.itemsPerRow;
        
        return items
            .slice(0, visibleCount)
            .map((item: any) => `${item.name} (${item.quantity})`);
    }

    // Get items as single line for tooltip
    getItemsTooltip(request: any): string {
        if (!request.items || request.items.length === 0) return '';
        return request.items
            .map((item: any) => `${item.name} (${item.quantity})`)
            .join(', ');
    }

    // Check if request is expanded
    isExpanded(requestId: string): boolean {
        return this.expandedItems[requestId] === true;
    }

    // Get remaining items count
    getRemainingCount(request: any): number {
        if (!request.items) return 0;
        return Math.max(0, request.items.length - this.itemsPerRow);
    }

    // Toggle expanded state
    toggleExpand(requestId: string) {
        // Reset all other expanded states
        Object.keys(this.expandedItems).forEach(key => {
            if (key !== requestId) {
                this.expandedItems[key] = false;
            }
        });
        
        // Toggle current request's expanded state
        this.expandedItems[requestId] = !this.expandedItems[requestId];
    }

    // Check if request has more items
    hasMoreItems(request: any): boolean {
        return request.items && request.items.length > this.itemsPerRow;
    }

    // Get the text for see more/less button
    getToggleText(request: any): string {
        if (!this.hasMoreItems(request)) return '';
        
        const remaining = this.getRemainingCount(request);
        return this.expandedItems[request.id] 
            ? 'See Less' 
            : `See ${remaining} more`;
    }

    changeStatus(id: string, newStatus: string) {
        const request = this.requests.find(x => x.id === id);
        if (!request) return;

        request.isUpdating = true;
        this.requestService.changeStatus(id, newStatus, `Status changed to ${newStatus} by admin`)
            .pipe(first())
            .subscribe({
                next: () => {
                    request.status = newStatus;
                    // Update workflow status if it exists
                    if (request.workflows?.length > 0) {
                        request.workflows[0].status = newStatus;
                    }
                    request.isUpdating = false;
                    this.alertService.success('Status updated successfully');
                },
                error: error => {
                    this.alertService.error(error);
                    request.isUpdating = false;
                }
            });
    }

    openDeleteModal(request: any) {
        this.selectedRequest = request;
        this.deleteModal.show();
    }

    confirmDelete() {
        if (!this.selectedRequest) return;
        
        this.isDeleting = true;
        this.requestService.delete(this.selectedRequest.id)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.deleteModal.hide();
                    this.alertService.success('Request deleted successfully', { keepAfterRouteChange: true });
                    this.requests = this.requests.filter(x => x.id !== this.selectedRequest.id);
                    this.isDeleting = false;
                    this.selectedRequest = null;
                },
                error: error => {
                    this.alertService.error(error);
                    this.isDeleting = false;
                }
            });
    }
} 