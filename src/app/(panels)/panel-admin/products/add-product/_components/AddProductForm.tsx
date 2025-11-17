"use client";

import { Button } from "@/app/_components/ui/button/button";
import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormDataState {
  name: string;
  price: string;
  shortDesc: string;
  longDesc: string;
  weight: string;
  suitableFor: string;
  smell: string;
  score: string;
  img: File | null;
  tags: string[];
}

const AddProductForm = () => {
  const { confirm } = useDialog();
  const router = useRouter();

  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    price: "",
    shortDesc: "",
    longDesc: "",
    weight: "",
    suitableFor: "",
    smell: "",
    score: "",
    img: null,
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const files = (e.target as HTMLInputElement).files;
    if (name === "img") {
      setFormData((prev) => ({
        ...prev,
        img: files?.[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    if (errors.tags) {
      setErrors((prev) => ({
        ...prev,
        tags: "",
      }));
    }
  };

  const addTag = () => {
    const newTag = tagInput.trim();
    if (!newTag) return;

    if (formData.tags.includes(newTag)) {
      setErrors((prev) => ({
        ...prev,
        tags: "این تگ قبلاً اضافه شده است.",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, newTag],
    }));
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "ضروری است";
    if (!formData.price) newErrors.price = "ضروری است";
    if (!formData.shortDesc.trim()) newErrors.shortDesc = "ضروری است";
    if (!formData.longDesc.trim()) newErrors.longDesc = "ضروری است";
    if (!formData.weight.trim()) newErrors.weight = "ضروری است";
    if (!formData.suitableFor.trim()) newErrors.suitableFor = "ضروری است";
    if (!formData.smell.trim()) newErrors.smell = "ضروری است";
    if (!formData.score) newErrors.score = "ضروری است";
    if (!formData.img) newErrors.img = "ضروری است";
    if (formData.tags.length === 0)
      newErrors.tags = "حداقل یک تگ باید اضافه شود";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("shortDesc", formData.shortDesc);
    data.append("longDesc", formData.longDesc);
    data.append("weight", formData.weight);
    data.append("suitableFor", formData.suitableFor);
    data.append("smell", formData.smell);
    data.append("score", formData.score);
    if (formData.img) {
      data.append("img", formData.img);
    }
    data.append("tags", JSON.stringify(formData.tags));

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error("ارسال محصول ناموفق بود");
      }
      if (res.status === 201) {
        await confirm({
          title: "",
          isQuestion: false,
          variant: "success",
          description: "محصول با موفقیت اضافه شد",
          confirmText: "مشاهده محصولات",
        }).then(() => router.push("/panel-admin/products"));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "مشکلی رخ داد";
      await confirm({
        title: "خطا در ثبت محصول",
        description: message,
        isQuestion: false,
        variant: "error",
        confirmText: "باشه",
      });
    }
  };

  const inputClass = (field: keyof FormDataState) =>
    `border rounded px-3 py-2 w-full focus:outline-none ${
      errors[field] ? "border-error" : "border-gray-300"
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-6 bg-white rounded shadow"
      noValidate
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block mb-1 font-semibold">نام محصول:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass("name")}
          />
          {errors.name && (
            <p className="text-error text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">قیمت:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={inputClass("price")}
          />
          {errors.price && (
            <p className="text-error text-sm mt-1">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">توضیح کوتاه:</label>
          <input
            type="text"
            name="shortDesc"
            value={formData.shortDesc}
            onChange={handleChange}
            className={inputClass("shortDesc")}
          />
          {errors.shortDesc && (
            <p className="text-error text-sm mt-1">{errors.shortDesc}</p>
          )}
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <label className="block mb-1 font-semibold">توضیح کامل:</label>
          <textarea
            name="longDesc"
            value={formData.longDesc}
            onChange={handleChange}
            className={inputClass("longDesc")}
            rows={4}
          />
          {errors.longDesc && (
            <p className="text-error text-sm mt-1">{errors.longDesc}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">وزن:</label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className={inputClass("weight")}
          />
          {errors.weight && (
            <p className="text-error text-sm mt-1">{errors.weight}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">مناسب برای:</label>
          <input
            type="text"
            name="suitableFor"
            value={formData.suitableFor}
            onChange={handleChange}
            className={inputClass("suitableFor")}
          />
          {errors.suitableFor && (
            <p className="text-error text-sm mt-1">{errors.suitableFor}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">بو:</label>
          <input
            type="text"
            name="smell"
            value={formData.smell}
            onChange={handleChange}
            className={inputClass("smell")}
          />
          {errors.smell && (
            <p className="text-error text-sm mt-1">{errors.smell}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">امتیاز (0 تا 10):</label>
          <input
            type="number"
            name="score"
            value={formData.score}
            onChange={handleChange}
            min="0"
            max="10"
            className={inputClass("score")}
          />
          {errors.score && (
            <p className="text-error text-sm mt-1">{errors.score}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">تصویر:</label>
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.img ? "border-error" : "border-gray-300"
            }`}
          />
          {errors.img && (
            <p className="text-error text-sm mt-1">{errors.img}</p>
          )}
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <label className="block mb-1 font-semibold">تگ‌ها:</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={handleTagInputChange}
              className={`flex-grow border rounded px-3 py-2 focus:outline-none ${
                errors.tags ? "border-error" : "border-primary/40"
              }`}
              placeholder="یک تگ وارد کنید"
            />
            <Button type="button" onClick={addTag}>
              +
            </Button>
          </div>
          {errors.tags && (
            <p className="text-error text-sm mt-1">{errors.tags}</p>
          )}

          {formData.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag) => (
                <li
                  key={tag}
                  className="bg-info/10 text-info px-3 py-1 rounded flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-error/90 hover:text-error font-bold"
                    aria-label={`حذف تگ ${tag}`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Button variant="success" type="submit">
          ثبت محصول
        </Button>
      </div>
    </form>
  );
};

export default AddProductForm;
