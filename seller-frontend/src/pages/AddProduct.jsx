import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const initialValues = {
    name: "",
    price: "",
    description: "",
  };

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

  const handleSubmit = async (values, { resetForm }) => {
    if (!image) {
      alert(" Please upload an image.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("image", image);

      await axios.post("http://localhost:5000/api/products/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(" Product added successfully");
      resetForm();
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error("Error:", err);
      alert(" Failed to add product");
    }
  };

  return (
    <div>
      <h1>Add Product</h1>

      {/*  Image Preview */}
      {preview && <img src={preview} width="100" alt="Preview" />}
      <br />
      <br />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form style={{ maxWidth: "400px" }}>
          {/* <label>Product Name:</label> */}
          <Field type="text" name="name" placeholder="Product Name" />
          <ErrorMessage name="name" component="div" style={{ color: "red" }} />
          <br />
          <br />

          {/* <label>Price:</label> */}
          <Field type="number" name="price" placeholder="Price" />
          <ErrorMessage name="price" component="div" style={{ color: "red" }} />
          <br />
          <br />

          {/* <label>Description:</label> */}
          <Field as="textarea" name="description" placeholder="Description" />
          <ErrorMessage
            name="description"
            component="div"
            style={{ color: "red" }}
          />
          <br />
          <br />

          {/* <label>Image:</label> */}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <ErrorMessage name="image" component="div" style={{ color: "red" }} />
          <br />
          <br />

          <button type="submit">Add Product</button>
        </Form>
      </Formik>
    </div>
  );
}

export default AddProduct;
