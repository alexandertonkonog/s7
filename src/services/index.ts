class Service {

  private path: string = 'https://reqres.in/api';

  public get<Type>(url: string, params?: { [key: string]: string }): Promise<Type> {
    return this.request(url, 'GET', params);
  }

  public post<Type>(url: string, body: { [key: string]: string }): Promise<Type> {
    return this.request(url, 'POST', body);
  }

  private async request<Type>(url: string, method: 'POST' | 'GET', body?: { [key: string]: string }): Promise<Type> {
    const token = localStorage.getItem('token');
    const params: RequestInit = {
      headers: token ? { 'Authorization': `Bearer ${token}` } : undefined,
      method
    };
    let path = this.path + url;
    if (method === 'POST' && body) {
      const formData = new FormData();
      Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value);
      })
      params.body = formData
    }
    if (method === 'GET' && body) {
      path += '?' + new URLSearchParams(body).toString();
    }
    const response = await fetch(path, params);
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.error);
    }
    return data;
  }
}

export default new Service();