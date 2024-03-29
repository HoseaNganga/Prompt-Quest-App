"use client";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`/api/users/${params?.profileId}/posts`);
      const respData = await resp.json();
      setUserPosts(respData);
    };
    if (params?.profileId) fetchData();
  }, [params.profileId]);
  return (
    <section className="w-full p-8">
      <ProfileCard
        name={userName}
        description={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
        userData={userPosts}
      />
    </section>
  );
};

export default UserProfile;
