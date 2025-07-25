import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  //  Validation Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });

  //  Handle submit
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        values
      );
      alert(res.data.message || "Signup successful");
      resetForm();
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h1>Signup</h1>

      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <label>Name</label>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" style={{ color: "red" }} />

          <label>Email</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" style={{ color: "red" }} />

          <label>Password</label>
          <Field type="password" name="password" />
          <ErrorMessage
            name="password"
            component="div"
            style={{ color: "red" }}
          />

          <br />
          <button type="submit" style={{ marginTop: "10px" }}>
            Signup
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Signup;
