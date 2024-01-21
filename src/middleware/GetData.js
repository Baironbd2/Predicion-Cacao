const URL = process.env.REACT_APP_URL;

export const getData = async () => {
    if (navigator.onLine) {
        const res = await fetch(`${URL}/api/all`);
        const responseJson = await res.json();
        const datos = responseJson[0];
        localStorage.setItem("offlineData", JSON.stringify(datos));
        return datos;
    } else {
        const offlineData = JSON.parse(
            localStorage.getItem("offlineData") || "[]"
        );
        return offlineData;
    }
};