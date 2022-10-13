import { useEffect } from "react";

function Test(){
    const getBh = async () => {
        const apiUrl = "http://localhost:8080/behavior_points";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data);
                }
            });
    };
    useEffect(() => {
        getBh();
    }, []);
    return (
        <h1>Just for Test API in console</h1>
    )

}
export default Test;