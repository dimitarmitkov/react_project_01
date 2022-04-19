import axios from "axios";

const axiosFunction = (url: string, query: {}, queryType: string, specification: string | null) =>{

    if(queryType === 'post' && specification === 'windowReload'){
        return axios.post(url, query)
        .then(response => {
            if (response.status === 200) {
                window.location.reload();
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    
}

export default axiosFunction;