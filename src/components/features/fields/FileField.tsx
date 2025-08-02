"use client";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { CloudDownloadIcon, X } from "lucide-react";
import type { IFileInput } from "@/models/inputs";
import Image from "next/image";
// import { getVideoThumbnail } from "@/utils/helpers";

interface PreviewFile {
  file: File;
  preview: string;
}

export const FileField = ({
  id,
  text,
  accept = "image/png,image/webp",
  multiple = false,
}: IFileInput) => {
  const [filesData, setFilesData] = useState<PreviewFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // React Hook Form
  const {
    register,
    formState: { errors },
    setValue,
    setError,
  } = useFormContext();
  const error = errors[id]?.message as string;
  const watchedFiles = useWatch({ name: id }) as File[] | undefined;

  useEffect(() => {
    if (watchedFiles && watchedFiles.length > 0) {
      const mapped = watchedFiles.map((file) => ({
        file,
        preview: file.type.includes("video")
          ? "/static/images/no-image360.webp"
          : URL.createObjectURL(file),
      }));
      setFilesData(mapped);
      return () => mapped.forEach((f) => URL.revokeObjectURL(f.preview));
    } else {
      setFilesData([]);
    }
  }, [watchedFiles]);

  // File removal
  const onClickClear = (index: number) => {
    setFilesData((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      setValue(
        id,
        updatedFiles.map(({ file }) => file),
        { shouldValidate: true },
      );
      return updatedFiles;
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLLabelElement>,
  ) => {
    const files: FileList | null =
      "dataTransfer" in e ? e.dataTransfer.files : e.target.files;
    if (!files) return;

    if (multiple) {
      const fileArray = Array.from(files);
      // Remove duplicates
      const existingFiles = new Set(
        filesData.map(({ file }) => file.name + file.size),
      );
      const uniqueFiles = fileArray.filter(
        (file) => !existingFiles.has(file.name + file.size),
      );
      if (uniqueFiles.length === 0) {
        return setError(id, { message: "You cannot upload duplicate files." });
      }
      const updatedFiles = [
        ...filesData.map(({ file }) => file),
        ...uniqueFiles,
      ];
      setValue(id, updatedFiles, { shouldValidate: true });
    } else {
      setValue(id, [files[0]], { shouldValidate: true });
    }
  };

  // Drag events
  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(true);
  };
  const onDragLeave = () => {
    setDragActive(false);
  };
  const onDropHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) {
      handleFileChange(e);
    }
  };

  return (
    <div
      // style={{ "--card-h": "345px" } as React.CSSProperties}
      className="flex w-full flex-col gap-2"
    >
      {text && <span className="text-center text-2xl">{text}</span>}
      <label
        className={`relative flex w-full cursor-pointer flex-col items-center gap-2 rounded-md border border-border p-2 transition ${dragActive ? "bg-foreground" : ""}`}
        htmlFor={id}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDropHandler}
      >
        <div
          className={`col flex h-50 w-full flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-primary transition-colors ${dragActive ? "bg-foreground" : ""}`}
        >
          <CloudDownloadIcon size={50} className="text-primary" />
          <span className="text-xl">Drag and drop files here</span>
          <span className="h-5 text-sm text-error">{error}</span>
        </div>

        <input
          id={id}
          className="hidden"
          type="file"
          accept={accept}
          multiple={multiple}
          {...register(id, { onChange: handleFileChange })}
        />
      </label>

      {filesData.length > 0 ? (
        <div className="flex max-h-92 max-w-full flex-col gap-2 overflow-y-auto rounded-md border border-border p-2">
          {filesData.map(({ file, preview }, i) => (
            <div
              key={file.name}
              className="relative flex w-full items-center gap-1 rounded-md border border-success p-2"
            >
              {preview &&
                (file.type.startsWith("image/") ||
                  file.type.startsWith("video/")) && (
                  <Image
                    className="h-13 rounded-md bg-ui object-contain"
                    src={preview}
                    alt="Preview"
                    width={52}
                    height={52}
                  />
                )}
              {preview && file.type === "application/pdf" && (
                <iframe src={preview} width={52} height={52} />
              )}

              <p className="text-md text-highlight grow truncate">
                {file.name}
              </p>
              <div className="text-sm">
                <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                <p className="truncate">Type: {file.type}</p>
              </div>
              <button
                className="flex min-w-6 cursor-pointer justify-end text-error"
                onClick={() => onClickClear(i)}
              >
                <X />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <span className="flex h-22 items-center justify-center rounded-md border border-border p-4 font-bold uppercase">
          no files loaded
        </span>
      )}
    </div>
  );
};
