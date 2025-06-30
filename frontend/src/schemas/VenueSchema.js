import * as yup from "yup";

const venueSchema = yup.object().shape({
  name: yup.string().required("Venue name is required"),
  location: yup.string().required("Location is required"),
  capacity: yup
    .number()
    .typeError("Capacity must be a number")
    .positive("Capacity must be positive")
    .integer("Capacity must be an integer")
    .required("Capacity is required"),
  amenities: yup
    .string()
    .required("Amenities are required (comma-separated values)"),
});

export default venueSchema;
