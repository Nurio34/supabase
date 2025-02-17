import { AnimatePresence, motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserInfo } from "../../Provided";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inputs, InputsSchema } from "@/app/instagram/types";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/providers/reduxjs-provider/hooks";
import {
    CldUploadWidget,
    CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import {
    setIsProfileUpdated,
    setUsername,
} from "@/providers/reduxjs-provider/slices/instagram";
import Image from "next/image";

function ProfileForm({
    setIsUpdatingProfile,
    userInfo,
}: {
    setIsUpdatingProfile: React.Dispatch<React.SetStateAction<boolean>>;
    userInfo: Omit<UserInfo, "username" | "id" | "createdAt" | "updatedAt">;
}) {
    const dispatch = useAppDispatch();

    const { formState, handleSubmit, register, reset, setValue } =
        useForm<Inputs>({
            resolver: zodResolver(InputsSchema),
        });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const res = await fetch("/instagram/api/update-profile", {
                method: "POST",
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                console.log(
                    "Error while 'onSubmit' in '/instagram/home/Components/UserInfo/Components/ProfileForm'",
                );
                throw new Error(
                    "Error while 'onSubmit' in '/instagram/home/Components/UserInfo/Components/ProfileForm'",
                );
            }

            const resData = await res.json();
            toast.success(resData);
            dispatch(setIsProfileUpdated(true));
        } catch (error) {
            console.log(
                "Unexpected error while 'onSubmit' in '/instagram/home/Components/UserInfo/Components/ProfileForm'",
            );
            throw new Error(
                "Unexpected error while 'onSubmit' in '/instagram/home/Components/UserInfo/Components/ProfileForm'",
            );
        }
    };

    useEffect(() => {
        if (userInfo) {
            reset({
                name: userInfo.name || "",
                surname: userInfo.surname || "",
                description: userInfo.description || "",
                city: userInfo.city || "",
                school: userInfo.school || "",
                work: userInfo.work || "",
                website: userInfo.website || "",
                avatar: userInfo.avatar || "",
                cover: userInfo.cover || "",
            });
        }
    }, [userInfo, reset]);

    const { errors, isSubmitting, isSubmitSuccessful } = formState;

    const [isCanceling, setIsCanceling] = useState<boolean>(false);

    useEffect(() => {
        if (isSubmitSuccessful) {
            setIsUpdatingProfile(false);
        }
    }, [setIsUpdatingProfile, isSubmitSuccessful]);

    const [avatar, setAvatar] = useState<string | undefined>(undefined);
    useEffect(() => {
        setValue("avatar", avatar);
    }, [avatar, setValue]);

    const [cover, setCover] = useState<string | undefined>(undefined);
    useEffect(() => {
        setValue("cover", cover);
    }, [cover, setValue]);

    useEffect(() => {
        setAvatar(userInfo.avatar);
        setCover(userInfo.cover);
    }, [userInfo.avatar, userInfo.cover]);

    return (
        <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className=" grid gap-y-[1vh]"
            exit={{ height: 0 }}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
        >
            <label htmlFor="name" className=" grid gap-y-[0.5vh]">
                <input
                    className="input input-sm input-primary w-full text-secondary placeholder:text-xs placeholder:font-light"
                    id="name"
                    placeholder="Name..."
                    defaultValue={userInfo.name || ""}
                    {...register("name")}
                />
                {errors.name && (
                    <span className="text-error text-sm font-light font-mono">
                        {errors.name.message}{" "}
                    </span>
                )}
            </label>
            <label htmlFor="surname" className=" grid gap-y-[0.5vh]">
                <input
                    className="input input-sm input-primary w-full text-secondary placeholder:text-xs placeholder:font-light"
                    id="surname"
                    placeholder="Surname..."
                    defaultValue={userInfo.surname || ""}
                    {...register("surname")}
                />
                {errors.surname && (
                    <span className="text-error text-sm font-light font-mono">
                        {errors.surname.message}{" "}
                    </span>
                )}
            </label>
            <label htmlFor="description" className=" grid gap-y-[0.5vh]">
                <input
                    className="input input-sm input-primary w-full text-secondary placeholder:text-xs placeholder:font-light"
                    id="description"
                    placeholder="Description..."
                    defaultValue={userInfo.description || ""}
                    {...register("description")}
                />
                {errors.description && (
                    <span className="text-error text-sm font-light font-mono">
                        {errors.description.message}{" "}
                    </span>
                )}
            </label>
            <label htmlFor="city" className=" grid gap-y-[0.5vh]">
                <input
                    className="input input-sm input-primary w-full text-secondary placeholder:text-xs placeholder:font-light"
                    id="city"
                    placeholder="City..."
                    defaultValue={userInfo.city || ""}
                    {...register("city")}
                />
                {errors.city && (
                    <span className="text-error text-sm font-light font-mono">
                        {errors.city.message}{" "}
                    </span>
                )}
            </label>
            <label htmlFor="school" className=" grid gap-y-[0.5vh]">
                <input
                    className="input input-sm input-primary w-full text-secondary placeholder:text-xs placeholder:font-light"
                    id="school"
                    placeholder="School..."
                    defaultValue={userInfo.school || ""}
                    {...register("school")}
                />
                {errors.school && (
                    <span className="text-error text-sm font-light font-mono">
                        {errors.school.message}{" "}
                    </span>
                )}
            </label>
            <label htmlFor="work" className=" grid gap-y-[0.5vh]">
                <input
                    className="input input-sm input-primary w-full text-secondary placeholder:text-xs placeholder:font-light"
                    id="work"
                    placeholder="Work..."
                    defaultValue={userInfo.work || ""}
                    {...register("work")}
                />
                {errors.work && (
                    <span className="text-error text-sm font-light font-mono">
                        {errors.work.message}{" "}
                    </span>
                )}
            </label>
            <label htmlFor="website" className=" grid gap-y-[0.5vh]">
                <input
                    className="input input-sm input-primary w-full text-secondary placeholder:text-xs placeholder:font-light"
                    id="website"
                    placeholder="Website..."
                    defaultValue={userInfo.website || ""}
                    {...register("website")}
                />
                {errors.website && (
                    <span className="text-error text-sm font-light font-mono">
                        {errors.website.message}{" "}
                    </span>
                )}
            </label>
            <div className="flex justify-between items-center">
                <div className="flex gap-[0.5vw]">
                    <figure className="relative w-[2vw] aspect-square rounded-full overflow-hidden">
                        <Image
                            src={avatar || "/instagram/no_avatar.webp"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            alt={`avatar of ${userInfo.name}`}
                        />
                    </figure>
                    <CldUploadWidget
                        uploadPreset="instagram"
                        onSuccess={(res: CloudinaryUploadWidgetResults) => {
                            if (!res.event) return;
                            else if (typeof res.info !== "string") {
                                setAvatar(res.info!.secure_url);
                            }
                        }}
                    >
                        {({ open }) => (
                            <button
                                type="button"
                                className=" text-warning underline underline-offset-4"
                                onClick={() => open()}
                            >
                                Change Avatar
                            </button>
                        )}
                    </CldUploadWidget>
                </div>
                <div className="flex gap-[0.5vw] items-center">
                    <figure className="relative w-[4vw] aspect-video rounded-md overflow-hidden">
                        <Image
                            src={cover || "/instagram/no_cover.webp"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            alt={`cover of ${userInfo.name}`}
                        />
                    </figure>
                    <CldUploadWidget
                        uploadPreset="instagram"
                        onSuccess={(res: CloudinaryUploadWidgetResults) => {
                            if (!res.event) return;
                            else if (typeof res.info !== "string") {
                                setCover(res.info!.secure_url);
                            }
                        }}
                    >
                        {({ open }) => (
                            <button
                                type="button"
                                className=" text-warning underline underline-offset-4"
                                onClick={() => open()}
                            >
                                Change Cover
                            </button>
                        )}
                    </CldUploadWidget>
                </div>
            </div>
            <div className="flex gap-[2vw]">
                <button
                    type="button"
                    className={`btn btn-sm  grow overflow-hidden transition-colors ${
                        !isCanceling ? "btn-accent" : "bg-base-100 text-accent"
                    }`}
                    onClick={
                        !isCanceling
                            ? () => setIsCanceling(true)
                            : () => setIsUpdatingProfile(false)
                    }
                >
                    <AnimatePresence mode="popLayout">
                        {!isCanceling ? (
                            <motion.span
                                key={"cancel"}
                                exit={{ x: "100%", opacity: 0 }}
                            >
                                Cancel
                            </motion.span>
                        ) : (
                            <motion.span
                                key={"sure"}
                                initial={{ x: "-100%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                            >
                                Sure ?
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
                <button
                    type="submit"
                    className={`btn btn-sm btn-secondary grow ${
                        isSubmitting && "disabled:text-secondary"
                    }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Updating..." : "Update"}
                </button>
            </div>
        </motion.form>
    );
}

export default ProfileForm;
