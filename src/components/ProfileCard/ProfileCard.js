import React from "react";
import UserPromptCard from "../UserPromptCard/UserPromptCard";

const ProfileCard = ({
  name,
  description,
  userData,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div>
      <div className="grid justify-center mb-8">
        <h1 className="head_text blue_gradient text-center">{name} Profile</h1>
        <p className="desc text-center">{description}</p>
      </div>
      <h2 className=" blue_gradient mb-8 text-4xl font-extrabold">
        My Prompts
      </h2>

      <div className="flex justify-start gap-8 flex-wrap">
        {userData.map((data) => (
          <UserPromptCard
            key={data._id}
            data={data}
            handleEdit={() => handleEdit && handleEdit(data)}
            handleDelete={() => handleDelete && handleDelete(data)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
