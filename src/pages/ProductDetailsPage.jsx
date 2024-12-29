import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    
    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    //             if (!response.ok) throw new Error("Failed to fetch product");
    //             const data = await response.json();
    //             setProduct(data);
    //         } catch (err) {
    //             setError(err.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchProduct();
    // }, [id]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.time("FetchProduct");
                setLoading(true);
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                if (!response.ok) throw new Error("Failed to fetch product");
                const data = await response.json();
                console.timeEnd("FetchProduct"); // Logs the time taken to fetch
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProduct();
    }, [id]);
    

    if (loading) {
        return <p>Loading product details...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", color: "black", border:"black solid " }}>
            <div style={{
                display: "flex",
                justifyContent:"center",
                alignItems:"center",
                gap: "20px",
                // alignItems: "flex-start",
                backgroundColor: "#f9f9f9",
                padding: "20px",
                margin: "30px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            >
               
                <div style={{ flex: "1", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img
                        src={product.image}
                        alt={product.title}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "400px",
                            borderRadius: "10px",
                            border: "1px solid #ddd",
                        }}
                    />
                </div>

                
                <div style={{ flex: "2" }}>
                    <h1 style={{ color: "#333", marginBottom: "20px" }}>
                        {product.title}
                    </h1>
                    <p>
                        <strong>ID:</strong> {product.id}
                    </p>
                    <p>
                        <strong>Rating:</strong> {product.rating?.rate} (
                        {product.rating?.count} reviews)
                    </p>
                    <p>
                        <strong>Description:</strong> {product.description}
                    </p>
                    <p>
                        <strong>Price :</strong> ${product.price}
                    </p>
                </div>
            </div>
            <button
                onClick={() => navigate("/")}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    cursor: "pointer",
                }}
            >
                Back to Home
            </button>
        </div>
    );
};

export default ProductDetailsPage;
