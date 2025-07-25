import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        const data = res.data;
        setInitialValues({
          name: data.name || "",
          price: data.price || "",
          description: data.description || "",
        });

        if (data.imageUrl) {
          const fullUrl = `http://localhost:5000/${data.imageUrl.replace(
            /\\/g,
            "/"
          )}`;
          setPreview(fullUrl);
        }
      })
      .catch((err) => console.log("Error loading product", err));
  }, [id]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be positive")
      .required("Price is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values) => {
    try {
      const filledValues = {
        name: values.name.trim() || initialValues.name,
        price: values.price || initialValues.price,
        description: values.description.trim() || initialValues.description,
      };

      const formData = new FormData();
      formData.append("name", filledValues.name);
      formData.append("price", filledValues.price);
      formData.append("description", filledValues.description);
      if (image) {
        formData.append("image", image);
      }

      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(" Product updated");
      navigate("/my-products");
    } catch (err) {
      alert(" Update failed");
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>

      {/*  Image preview */}
      {preview && <img src={preview} width="100" alt="Preview" />}
      <br />
      <br />

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form style={{ maxWidth: "400px" }}>
          <Field type="text" name="name" placeholder="Product Name" />
          <ErrorMessage name="name" component="div" style={{ color: "red" }} />
          <br />
          <br />

          <Field type="number" name="price" placeholder="Price" />
          <ErrorMessage name="price" component="div" style={{ color: "red" }} />
          <br />
          <br />

          <Field as="textarea" name="description" placeholder="Description" />
          <ErrorMessage
            name="description"
            component="div"
            style={{ color: "red" }}
          />
          <br />
          <br />

          <input type="file" accept="image/*" onChange={handleImageChange} />
          <br />
          <br />

          <button type="submit">Save Changes</button>
        </Form>
      </Formik>
    </div>
  );
}

export default EditProduct;
