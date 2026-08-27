import { useForm } from "react-hook-form"
import { FaUser, FaLock } from "react-icons/fa";
import { useTodoListContext } from "../../../Contexts/TodoListContext";
import { useNavigate } from "react-router-dom";
import { TOKEN_KEY, USER_KEY } from "../../../Constants/constants";
import "../Login/Login.scss";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginApi } from "../../../apis/login";

const schema = z.object({
  userName: z
    .string()
    .min(1, "وارد کردن ایمیل الزامی است")
    .email("فرمت ایمیل صحیح نیست"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),

})

function Login() {
  const userContext = useTodoListContext();
  const tokenContext = useTodoListContext();
  const loginApi = useLoginApi();


  if (!userContext || !tokenContext) {
    throw new Error(
      "Login must be inside UserContext.Provider and TokenContext.Provider",
    );
  }

  const { setUser } = userContext;
  const { setToken } = tokenContext;

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange"
  });

  const onSubmit = async (data: {
    userName: string;
    password: string;
  }) => {

    const loginResult = await loginApi.login(data.userName, data.password);
    if (loginResult) {
      navigate("/");
      setUser(loginResult.user);
      setToken(loginResult.token);
      localStorage.setItem(USER_KEY, JSON.stringify(loginResult.user));
      localStorage.setItem(TOKEN_KEY, loginResult.token);
    }
  }

  return (
    <form className="flex flex-col gap-8 p-4" onSubmit={handleSubmit(onSubmit)} >
      <div style={{ padding: "20px" }}>
        <h1>Login to the App</h1>
        <div className="loginBox">
          <div className="row">
            <label htmlFor="username">Username</label>
            <div className="inputWrapper">
              <input
                type="email"
                {...register("userName")}

                className="username"

              />
              {errors?.userName && <p>{errors?.userName.message}</p>}

              <FaUser className="icon" />
            </div>
          </div>
          <div className="row">
            <label htmlFor="password">Password</label>
            <div className="inputWrapper">
              <input
                {...register("password")}
                className="password"
                type="password"
              />
              {errors?.password && <p>{errors?.password.message}</p>}

              <FaLock className="icon" />
            </div>
          </div>
          <div className="errorLogin">
            <span>The username or password is incorrect,Please try again.</span>
          </div>
        </div>
        <div className="loginBtnContainer" style={{}}>
          <input type="submit" value="Login" className="loginBtn" />


        </div>
      </div>
    </form>
  );
}

export default Login;
