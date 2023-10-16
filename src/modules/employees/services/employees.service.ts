import { TypeEmployee } from '@/modules/employees/features';
import { HttpService } from '@/lib/services';
import { API_URL } from '@/config/environment';

const employees = {
  getEmployees: '/employees',
};

class Employees extends HttpService {
  async getEmployees(params?: object) {
    const url = this.createUrl(employees.getEmployees, params);

    const response = await this.get<TypeEmployee[]>(url);

    return response;
  }

  async addEmployee(data: TypeEmployee) {
    const url = this.createUrl(employees.getEmployees);

    const response = await this.post<TypeEmployee>(url, data);

    return response;
  }

  async updateEmployee(id: string, data: Partial<TypeEmployee>) {
    const url = this.createUrl(employees.getEmployees + '/' + id);

    const response = await this.patch<Partial<TypeEmployee>>(url, data);

    return response;
  }

  async deleteEmployee(id: string) {
    const url = this.createUrl(employees.getEmployees, { id });

    const response = await this.delete<[]>(url);

    return response;
  }
}

export const employeesService = new Employees(API_URL);
