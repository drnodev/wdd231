export const joinForm = () =>{
    const timestamp = new Date().toISOString();
    document.getElementById("timestamp").value = timestamp;
}

export const thankyou = () =>{
    const params = new URLSearchParams(window.location.search);
    const fields = ["fname", "lname", "email", "phone", "organization", "timestamp"];

    fields.forEach(field => {
        const value = params.get(field) || "N/A";
        document.getElementById(field).textContent = decodeURIComponent(value.replace(/\+/g, ' '));
    });
}