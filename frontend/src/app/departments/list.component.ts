import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { DepartmentService, AlertService, EmployeeService } from '@app/_services';
import { Department } from '@app/_models';

export class ListComponent implements OnInit {
    departments: Department[] = [];
    departmentToDelete = null;
    showDeleteModal = false;

    constructor(
        private departmentService: DepartmentService,
        private employeeService: EmployeeService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.loadDepartmentsWithEmployeeCounts();
    }

    private loadDepartmentsWithEmployeeCounts() {
        // First load all departments
        this.departmentService.getAll()
            .pipe(first())
            .subscribe(departments => {
                this.departments = departments;
                
                // Then load all employees to count department assignments
                this.employeeService.getAll()
                    .pipe(first())
                    .subscribe(employees => {
                        // Calculate employee count for each department
                        this.departments.forEach(dept => {
                            dept.employeeCount = employees.filter(emp => 
                                emp.departmentId.toString() === dept.id.toString()
                            ).length;
                        });
                    });
            });
    }

    openDeleteModal(department) {
        this.departmentToDelete = department;
        this.showDeleteModal = true;
        document.body.classList.add('modal-open');
    }

    confirmDelete() {
        if (!this.departmentToDelete) return;
        
        const department = this.departmentToDelete;
        department.isDeleting = true;

        this.departmentService.delete(department.id)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.departments = this.departments.filter(x => x.id !== department.id);
                    this.alertService.success('Department deleted successfully');
                    this.closeDeleteModal();
                },
                error: error => {
                    this.alertService.error(error);
                    department.isDeleting = false;
                    this.closeDeleteModal();
                }
            });
    }

    closeDeleteModal() {
        this.showDeleteModal = false;
        document.body.classList.remove('modal-open');
        this.departmentToDelete = null;
    }
} 