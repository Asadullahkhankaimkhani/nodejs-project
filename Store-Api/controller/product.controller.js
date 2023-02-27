const getAllProducts = async (req, res) => {
	res.status(200).json({
		msg: "Products Route",
	});
};

const getProduct = async (req, res) => {
	res.status(200).json({
		msg: "Product",
	});
};

module.exports = {
	getAllProducts,
	getProduct,
};
