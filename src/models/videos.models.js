import mongoose from "mongoose";
//Here I want to use some aggrigation queries , to use them I have already installed packages
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      lowercase: true,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    videos: [(type = String), (require = true)],
    videoFile: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: 0,
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    views: {
      type: String,
      default: 0,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate)//I just plugged in the aggrigate package.
export const Video = mongoose.model("Video", videoSchema);
