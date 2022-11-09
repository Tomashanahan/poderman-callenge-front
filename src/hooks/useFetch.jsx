import { useState, useEffect } from "react";
import axios from "axios";

function useFetch({ url }) {
	const token = JSON.parse(localStorage.getItem("token"));
	const user = JSON.parse(localStorage.getItem("userInfo"));
	const [data, setData] = useState([]);

	const fetchInfo = async () => {
		// const result = await axios(`${url}`, {
		const result = await axios(url, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		setData(result);
	};

	useEffect(() => {
		fetchInfo();
	}, [url]);

	return [data];
}

export default useFetch;
