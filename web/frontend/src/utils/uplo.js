export const checkImage = (file) => {
    const types = ["image/png", "image/jpeg", "image/WebP"];
    let err = "";
    if (!file) return (err = "File does not exist.");

    // if (file.size > 1024 * )
    //   // 1mb
    //   err = "The largest image size is 1mb";

    if (!types.includes(file.type)) err = "The image type is png / jpeg";
    return err;
};

export const imageUpload = async (file, access_token) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ebc6ba4w");
    formData.append("cloud_name", "dondpcxxo");
    const res = await fetch("https://api.cloudinary.com/v1_1/dondpcxxo/upload", {
        method: "POST",
        body: formData,
    });
    const data = await res.json();
    return { public_id: data.public_id, url: data.secure_url };
};

export const userimageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dq3mlenq");
    formData.append("cloud_name", "dzlgzqdic");
    const res = await fetch("https://api.cloudinary.com/v1_1/dzlgzqdic/upload", {
        method: "POST",
        body: formData,
    });
    const data = await res.json();

    return { public_id: data.public_id, url: data.secure_url };
};