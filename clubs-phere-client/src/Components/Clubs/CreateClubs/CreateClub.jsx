import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";



const CreateClub = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isPaid, setIsPaid] = useState(false);

  const image = watch("image");

  const createClubSubmit = async (data) => {
    try {
      const clubData = {
        clubName: data.clubName,
        description: data.description,
        category: data.category,
        image: data.image,
        membershipFee: isPaid ? Number(data.membershipFee) : 0,
        createdBy: user?.email
      };
      console.log(clubData)

      const res = await axiosSecure.post("/clubs", clubData);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "✅ Club created! Waiting for admin approval",
          showConfirmButton: false,
          timer: 2500
        });
      }
    } catch (error) {
      console.error('Error creating club:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create club. Please try again.',
      });
    }
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 
        className="text-4xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Create New Club
      </motion.h2>

      <motion.form 
        onSubmit={handleSubmit(createClubSubmit)} 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >

        {/* Club Name */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="font-medium">Club Name</label>
          <input
            {...register("clubName", { required: 'Club Name is required' })}
            placeholder="e.g., Photography Enthusiasts Club, Tech Innovators Society, Sports Champions United"
            className="input input-bordered w-full mt-1"
          />
          {errors.clubName && (
            <p className="text-red-500 text-sm mt-1">{errors.clubName.message}</p>
          )}
        </motion.div>

        {/* Image URL */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="font-medium">Club Banner Image URL</label>
          <input
            {...register("image", { required: 'Image URL is required' })}
            placeholder="e.g., https://images.unsplash.com/photo-1542500429-4116073fc98f (club activity, meeting, or relevant image)"
            className="input input-bordered w-full mt-1"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}


          {image && (
            <motion.img
              src={image}
              alt="preview"
              className="mt-3 rounded-xl max-h-48 object-cover"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            />
          )}
        </motion.div>

        {/* Description */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className="font-medium">Description</label>
          <textarea
            {...register("description", { required: 'Description is required' })}
            rows="4"
            placeholder="Share your club's mission, vision, activities, meeting schedule, goals, and what makes it special. Describe what members will gain from joining and any unique features your club offers..."
            className="textarea textarea-bordered w-full mt-1"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </motion.div>

        {/* Category */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <label className="font-medium">Category</label>
          <select {...register("category", { required: 'Category is required' })} className="select select-bordered w-full mt-1">
            <option value="">Select a category</option>
            <option>Photography</option>
            <option>Tech</option>
            <option>sports</option>
            <option>Book Club</option>
            <option>Journalism</option>
            <option>Media</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </motion.div>


        {/* Membership Fee */}
        <motion.div 
          className="bg-gray-50 p-5 rounded-xl space-y-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <label className="font-medium">Membership Type</label>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="feeType"
                defaultChecked
                onChange={() => setIsPaid(false)}
              />
              Free
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="feeType"
                onChange={() => setIsPaid(true)}
              />
              Paid
            </label>
          </div>

          {isPaid && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="number"
                {...register("membershipFee", { required: 'Membership fee is required when paid', min: { value: 1, message: 'Fee must be at least 1' } })}
                placeholder="e.g., 25"
                className="input input-bordered w-full"
              />
              {errors.membershipFee && (
                <p className="text-red-500 text-sm mt-1">{errors.membershipFee.message}</p>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Submit */}
        <motion.button 
          type="submit" 
          className="btn btn-success w-full font-bold"
          disabled={isSubmitting}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? 'Creating...' : 'Create Club'}
        </motion.button>

      </motion.form>
    </motion.div>
  );
};

export default CreateClub;
