import Variant from "../models/variant";

//Addvariant
export const addVariant = async (req, res, next) => {
    try {
        const newVariant = new Variant(req.body);
        await newVariant.save();
        res.status(201).json({
            success: true,
            data: newVariant
        });
    } catch (error) {
        next(error);
    }
}
// Update variant
export const updateVariant = async (req, res, next) => {
    try {
        const updatedVariant = await Variant.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!updateVariant) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy biến thể"
            })
        }
        res.status(200).json({
            success: true,
            data: updatedVariant
        })

    } catch (error) {
        next(error);
    }
}
// Delete variant
export const deleteVariant = async (req, res, next) => {
    try {
        const deletedVariant = await Variant.findByIdAndDelete(req.params.id);
        if (!deletedVariant) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy biến thể"
            });
        }
        res.status(200).json({
            success: true,
            message: "Biến thể đã được xóa thành công"
        });
    } catch (error) {
        next(error);
    }
}