import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Checkout() {
  const { id } = useParams(); // productId from URL
  const [product, setProduct] = useState(null);
  const userId = "123"; // Replace with actual logged-in user ID

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  const initialValues = {
    customerName: "",
    customerAddress: "",
    customerNumber: "",
    quantity: 1,
  };

  const validationSchema = Yup.object().shape({
    customerName: Yup.string().required("Name is required"),
    customerAddress: Yup.string().required("Address is required"),
    customerNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter valid 10-digit number")
      .required("Mobile number is required"),
    quantity: Yup.number().min(1).required("Quantity is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const totalPrice = product.price * values.quantity;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/orders/allProducts",
        {
          // productId: id,
          // customerId: "64f7cc9baaa6ef22fe9b1234", // Replace with real user ID (from auth)
          // quantity: values.quantity,
          // totalPrice,
          // customerName: values.customerName,
          // customerAddress: values.customerAddress,
          // customerNumber: values.customerNumber,
          userId: userId,
          products: [
            {
              productId: product._id,
              quantity: values.quantity,
              price: product.price,
            },
          ],
          totalPrice,
        }
      );

      alert("✅ Order Placed Successfully!");
      resetForm();
    } catch (err) {
      console.log("Order error:", err);
      alert("❌ Failed to place order");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2>🛒 Checkout</h2>

      <div style={styles.responsiveBox}>
        {/* Product Image */}
        <img
          src={`http://localhost:5000/${product.imageUrl}`}
          alt={product.name}
          style={styles.image}
        />

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form style={styles.form}>
              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>

              <div style={styles.fieldBox}>
                <label>Name</label>
                <Field name="customerName" type="text" />
                <ErrorMessage
                  name="customerName"
                  component="div"
                  style={styles.error}
                />
              </div>

              <div style={styles.fieldBox}>
                <label>Address</label>
                <Field name="customerAddress" type="text" />
                <ErrorMessage
                  name="customerAddress"
                  component="div"
                  style={styles.error}
                />
              </div>

              <div style={styles.fieldBox}>
                <label>Mobile Number</label>
                <Field name="customerNumber" type="text" />
                <ErrorMessage
                  name="customerNumber"
                  component="div"
                  style={styles.error}
                />
              </div>

              <div style={styles.fieldBox}>
                <label>Quantity</label>
                <Field name="quantity" type="number" min="1" />
                <ErrorMessage
                  name="quantity"
                  component="div"
                  style={styles.error}
                />
              </div>

              <p>
                <strong>Total:</strong> ₹{product.price * values.quantity}
              </p>

              <button type="submit" style={styles.button}>
                Confirm Order
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "1.5rem",
    maxWidth: "900px",
    margin: "auto",
  },
  responsiveBox: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  image: {
    width: "100%",
    maxWidth: "300px",
    borderRadius: "10px",
    alignSelf: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  fieldBox: {
    display: "flex",
    flexDirection: "column",
  },
  error: {
    color: "red",
    fontSize: "0.85rem",
  },
  button: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Checkout;
