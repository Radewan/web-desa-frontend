import axios from "axios";

export class UserApi {
  static async userRegister(registerRequest: RegisterRequest) {
    return await axios.post(
      "http://localhost:8080/users/register",
      registerRequest
    );
  }
  static async userLogin(loginRequest: LoginRequest) {
      const response = await axios.post(
        "http://localhost:8080/users/login",
        loginRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response;
  }
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}
