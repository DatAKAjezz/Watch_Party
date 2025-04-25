import axios from 'axios'

export const getMovieDetails = async (slug) => {
    try {
        const details = await axios.get(`https://ophim1.com/phim/${slug}`)
        return details.data
    } catch (error) {
        console.log("Error at getMovieDetails: ", error);
        return null;
    } 
}

export const logout = async () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
    sessionStorage.removeItem('userToken');
}
