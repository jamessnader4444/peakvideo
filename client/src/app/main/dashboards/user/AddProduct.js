import { Button, Switch, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import UploadIcon from "@mui/icons-material/Upload";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { selectUser } from "app/store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import { setUser } from "app/store/userSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import FusePageSimple from "@fuse/core/FusePageSimple/FusePageSimple";
import InputLabel from "@mui/material/InputLabel";

const schema = yup.object().shape({
  name: yup.string().required("You must enter a video name."),
  thumbnail: yup
    .mixed()
    .test(
      "required",
      "You must select a video thumbnail.",
      (value) => value.length > 0
    )
    .test("fileSize", "File Size should be less than 5M. ", (value) => {
      return value.length && value[0].size <= 5242880;
    })
    .test("fileType", "Unsupported File Format(jpeg, png, jpg).", (value) => {
      return (
        value.length &&
        ["image/jpeg", "image/png", "image/jpg", "image/bmp"].includes(
          value[0].type
        )
      );
    }),
  video: yup
    .mixed()
    .test("required", "You must select a video.", (value) => value.length > 0)
    // .test("fileSize", "File Size is too large.", (value) => {
    //   return value.length && value[0].size <= 5242880;
    // })
    .test("fileType", "Unsupported File Format(mp4).", (value) => {
      return value.length && ["video/mp4"].includes(value[0].type);
    }),
  description: yup
    .string()
    .required("Please enter a video description.")
    .min(10, "Description should be 10 chars minimum."),
});
const defaultValues = {
  name: "",
  thumbnail: "",
  video: "",
  description: "",
};
export default function AddProduct() {
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState(-1);
  const [categories, setCategories] = useState(null);
  const [isPeakVideo, setIsPeakVideo] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const { control, formState, register, setError, handleSubmit } = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    fetchCategories();
  }, []);

  const upload = async (data) => {
    //upload image and video
    setUploading(true);
    const formData = new FormData();
    formData.append("file", data.thumbnail[0]);

    let response = await axios.post("api/uploads/file", formData);
    const imageURL = response.data.filename;

    const formData1 = new FormData();
    formData1.append("file", data.video[0]);
    response = await axios.post("api/uploads/file", formData1);
    const videoURL = response.data.filename;

    data.categoryId = isPeakVideo ? -1 : category;
    response = await axios.post("api/products/add", {
      ...data,
      imageURL,
      videoURL,
      userId: user.data.id,
    });
    dispatch(setUser(response.data.user));
    dispatch(showMessage({ message: "Product is added successfully." }));

    setUploading(false);
  };
  const fetchCategories = async () => {
    const response = await axios.post("api/categories/all");
    setCategories(response.data);
  };

  const handlePeakVideoChange = () => {
    setIsPeakVideo(!isPeakVideo);
  };
  return (
    <FusePageSimple
      header={
        <div className="mt-20 flex justify-center items-center text-[40px]">
          Add Product
        </div>
      }
      content={
        <div className="p-20 w-full">
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit((data) => upload(data))}
          >
            <div className="mt-48 mb-16">
              <Typography className="font-medium text-20 mb-6">
                Video Name
              </Typography>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      autoFocus
                      type="name"
                      error={!!errors.name}
                      helperText={errors?.name?.message}
                      label="Video name"
                      variant="outlined"
                      fullWidth
                    />
                  </>
                )}
              />
            </div>
            <div className="mt-48 mb-16">
              <Typography className="font-medium text-20 mb-6">
                Video thumbnail
              </Typography>
              <FormControl error={!!errors.thumbnail} fullWidth>
                <input
                  {...register("thumbnail")}
                  type="file"
                  accept="image/*"
                />

                <FormHelperText>{errors?.thumbnail?.message}</FormHelperText>
              </FormControl>
            </div>
            <div className="mt-48 mb-16">
              <Typography className="font-medium text-20 mb-6">
                Video
              </Typography>
              <FormControl error={!!errors.video} fullWidth>
                <input {...register("video")} type="file" accept="video/*" />

                <FormHelperText>{errors?.video?.message}</FormHelperText>
              </FormControl>
            </div>
            <div className="mt-48 mb-16"></div>

            <div className="mt-48 mb-16">
              <Typography className="font-medium text-20 mb-6">
                Category
              </Typography>
              <FormControl
                disabled={isPeakVideo}
                error={!!errors.category}
                required
                fullWidth
              >
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Category"
                  variant="outlined"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div className="mt-24">
                <span className="font-medium text-20">Peak Video:</span>
                <Switch
                  onChange={handlePeakVideoChange}
                  checked={isPeakVideo}
                />
              </div>
            </div>
            <div className="mt-48 mb-16">
              <Typography className="font-medium text-20 mb-6">
                Description
              </Typography>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      error={!!errors.description}
                      helperText={errors?.description?.message}
                      label="Description"
                      variant="outlined"
                      multiline
                      rows={5}
                      fullWidth
                    />
                  </>
                )}
              />
            </div>
            <Button
              className="my-32"
              color="secondary"
              variant="outlined"
              type="submit"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              startIcon={<UploadIcon />}
            >
              {uploading ? (
                <CircularProgress className="p-4" color="secondary" />
              ) : (
                "Upload"
              )}
            </Button>
          </form>
        </div>
      }
    ></FusePageSimple>
  );
}
