import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // setLoading(true);
                const response = await fetch("https://fakestoreapi.com/products");
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.statusText}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleViewDetails = (id) => {
        navigate(`/product/${id}`);
    };

    // Pagination Login here 
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentProducts = products.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(products.length / rowsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", }}>
            <div style={{ marginBottom: "20px" }}>
                <h2 style={{ color: "#007BFF" }}>Products</h2>
                <hr
                    style={{
                        width: "20%",
                        margin: "0 auto",
                        border: "2px solid #007BFF",
                        borderRadius: "5px",
                    }}
                />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <table
                    // border="1"
                    style={{
                        textAlign: "left",
                        width: "80%",
                        borderCollapse: "collapse",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        marginBottom: "20px",
                        border: "none",
                    }}
                >
                    <thead style={{ borderBottom: "2px solid #ddd" }}>
                        <tr style={{ padding: "10px" }}>
                            <th style={{ padding: "10px" }}>ID</th>
                            <th style={{ padding: "10px" }}>Title</th>
                            <th style={{ padding: "10px" }}>Price</th>
                            <th style={{ padding: "10px" }}>Category</th>
                            <th style={{ padding: "10px" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product) => (
                            <tr key={product.id} style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "10px" }}>{product.id}</td>
                                <td style={{ padding: "10px" }}>{product.title}</td>
                                <td style={{ padding: "10px" }}>${product.price}</td>
                                <td style={{ padding: "10px" }}>{product.category}</td>
                                <td style={{ padding: "10px" }}>
                                    <button
                                        onClick={() => handleViewDetails(product.id)}
                                        style={{
                                            backgroundColor: "#007BFF",
                                            color: "white",
                                            border: "none",
                                            padding: "5px 10px",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Show
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    style={{
                        padding: "5px 10px",
                        backgroundColor: currentPage === 1 ? "#ccc" : "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    }}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    style={{
                        padding: "5px 10px",
                        backgroundColor: currentPage === totalPages ? "#ccc" : "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default HomePage;
