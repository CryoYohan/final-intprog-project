const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById,
    getByAccountId,
    create,
    update,
    transfer,
    delete: _delete
};


async function transfer(id, params) {
    const employee = await getEmployee(id);
    const oldDepartmentId = employee.departmentId;

    // validate department exists
    const newDepartment = await db.Department.findByPk(params.departmentId);
    if (!newDepartment) throw 'New department not found';

    // don't transfer if already in the same department
    if (oldDepartmentId === params.departmentId) {
        throw 'Employee is already in this department';
    }

    // update employee department
    employee.departmentId = params.departmentId;
    employee.updated = Date.now();
    await employee.save();

    // Get account and department details for the workflow log
    const account = await db.Account.findByPk(employee.accountId);
    const oldDept = oldDepartmentId ? await db.Department.findByPk(oldDepartmentId) : null;

    // Create workflow entry for department transfer
    await createWorkflowLog(employee.id, 'Department Transfer', {
        details: `The Employee Named ${capitalizeFirstLetter(account.firstName)} ${capitalizeFirstLetter(account.lastName)} was transferred from ${oldDept ? oldDept.name : 'No Department'} to ${newDepartment.name} Department${params.reason ? ` - Reason: ${params.reason}` : ''}.`
    });

    return employee;
}

async function _delete(id) {
    const employee = await getEmployee(id);
    
    // Get account details for the workflow log
    const account = await db.Account.findByPk(employee.accountId);

    // Create workflow entry for employee deletion
    await createWorkflowLog(employee.id, 'Deleted', {
        details: `The Employee Named ${capitalizeFirstLetter(account.firstName)} ${capitalizeFirstLetter(account.lastName)} was deleted.`
    });

    await employee.destroy();
}

// helper functions
async function getEmployee(id) {
    const employee = await db.Employee.findByPk(id, {
        include: [
            {
                model: db.Account,
                attributes: ['id', 'firstName', 'lastName', 'email']
            },
            {
                model: db.Department,
                as: 'Department',
                attributes: ['id', 'name', 'code', 'status']
            }
        ]
    });
    if (!employee) throw 'Employee not found';
    return employee;
}

async function createWorkflowLog(employeeId, type, details) {
    await db.Workflow.create({
        employeeid: employeeId,
        type: type,
        details: details.details,
        status: 'Completed'
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
} 