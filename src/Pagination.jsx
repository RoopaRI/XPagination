import React, {useState, useEffect} from "react";
import "./Pagination.css";
import axios from "axios";

export default function Pagination(){
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items to display per page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    const fetchData = async () => {
        try{
            const response = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
            setData(response.data);
            console.log("data",data);
        }
        catch(e){
            window.alert("failed to fetch data");
            console.log("failed to fetch data");
        }
    } 


    const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
    };
    
    const handleNextPage = () => {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
    };

    useEffect(()=> {
        fetchData();
    }, []);

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((e) => (
                        <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.role}</td>
                        </tr>
                    ))}
                </tbody>
            
            </table>  

            <div className="buttons">
                <button onClick={handlePreviousPage}>Previous</button>
                <button>{currentPage}</button>
                <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
        
    );
}