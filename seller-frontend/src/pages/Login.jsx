import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  //  Validation
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  //  Submit
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        values
      );

      const { token, user } = res.data;

      //  Save token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful");
      resetForm();
      // navigate("/my-products"); // ya /dashboard
      navigate("/dashboard"); // ya /my-products
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h1>Login</h1>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <label>Email</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" style={{ color: "red" }} />
          <br />
          <br />
          <label>Password</label>
          <Field type="password" name="password" />
          <ErrorMessage
            name="password"
            component="div"
            style={{ color: "red" }}
          />

          <br />
          <button type="submit" style={{ marginTop: "10px" }}>
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
