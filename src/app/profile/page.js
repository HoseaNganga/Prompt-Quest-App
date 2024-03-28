"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ProfileCard from "@/components/ProfileCard/ProfileCard";

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  const handleEdit = (userData) => {
    router.push(`/update-prompt?id=${userData._id}`);
  };
  const handleDelete = async (userData) => {
    try {
      await fetch(`/api/prompt/${userData._id.toString()}`, {
        method: "DELETE",
      });
      const filteredPosts = userData.filter(
        (data) => data._id !== userData._id
      );
      setUserData(filteredPosts);
    } catch (error) {
      console.log(error);
    } finally {
      router.push("/");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`/api/users/${session?.user.id}/posts`);
      const respData = await resp.json();
      setUserData(respData);
    };
    if (session?.user.id) {
      fetchData();
    }
  }, []);

  return (
    <section className="w-full p-8">
      <ProfileCard
        name="My"
        description="Welcome to your personalized profile page"
        userData={userData}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </section>
  );
};

export default Profile;
