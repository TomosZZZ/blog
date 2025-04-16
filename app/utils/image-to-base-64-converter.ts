interface ImageConversionResponse {
  success: boolean;
  message: string;
  result: string;
}

export const convertImageToBase64 = (
  image: File
): Promise<ImageConversionResponse> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const response = {
        success: true,
        message: "Image converted to base64 successfully",
        result: reader.result as string,
      };
      resolve(response);
    };
    reader.onerror = () => {
      const response = {
        success: false,
        message: "Failed to convert image to base64",
        result: "",
      };
      resolve(response);
    };
  });
};
