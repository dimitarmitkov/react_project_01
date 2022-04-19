import axios from "axios";

const axiosFunction = (url: string, query: {}, queryType: string, specification: string | null, location = '/',status = 200) => {

    if(queryType === 'post' && specification === 'windowReload'){
        axios.post(url, query)
        .then(response => {
            if (response.status === status) {
                window.location.reload();
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    if(queryType === 'post' && specification === 'windowHref'){
        axios.post(url, query)
        .then(response => {
            if (response.status === status) {
                window.location.href = location;
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
}



export default axiosFunction;