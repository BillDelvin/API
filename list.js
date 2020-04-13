let data = [];
axios
	.get("http://localhost:3000/Buku")
	.then((res) => {
		const listsHTML = document.querySelector("#listdata");
		data = res.data;

		data.forEach((item) => {
			const { id, namaBuku, penerbitBuku, jumlahHalaman, jumlahBuku } = item;
			const tableHTML = `<tr>
                <td>${namaBuku}</td>
                <td>${penerbitBuku}</td>
                <td>${jumlahHalaman}</td>
                <td>${jumlahBuku}</td>
                <td>
                    <button type="button" onclick="update(${id})" class="btn btn-outline-secondary">
                        <i class="far fa-edit"></i>
                    </button>
                    <button type="button" onclick="remove(${id})" class="btn btn-outline-danger">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
            `;
			listsHTML.innerHTML += tableHTML;
		});
	})
	.catch((pesanError) => {
		console.error(pesanError);
	});

const update = (id) => {
	const listData = data.find((item) => {
		return item.id === id;
	});

	if (listData) {
		const namaBuku = window.prompt("Nama Buku", listData.namaBuku);
		const penerbitBuku = window.prompt("Penerbit Buku", listData.penerbitBuku);
		const jumlahHalaman = window.prompt("Jumlah Halaman", listData.jumlahHalaman);
		const jumlahBuku = window.prompt("Jumlah Buku", listData.jumlahBuku);

		const data = {
			namaBuku,
			penerbitBuku,
			jumlahHalaman,
			jumlahBuku,
		};

		axios.put(`http://localhost:3000/Buku/${id}`, data);
	}
};

const remove = (id) => {
	axios.delete(`http://localhost:3000/Buku/${id}`);
};
