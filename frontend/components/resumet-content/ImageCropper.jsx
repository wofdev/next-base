'use client';

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function ImageCropper({ imageSrc, onComplete }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImg = async () => {
    const croppedImage = await getCroppedImage(imageSrc, croppedAreaPixels, rotation);
    onComplete(croppedImage);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-full h-[400px] bg-gray-100 rounded-xl overflow-hidden">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <div className="w-full space-y-2">
        <label className="text-sm font-medium">Zoom</label>
        <Slider
          value={[zoom]}
          onValueChange={(v) => setZoom(v[0])}
          min={1}
          max={3}
          step={0.1}
        />
        <label className="text-sm font-medium mt-2">Rotation</label>
        <Slider
          value={[rotation]}
          onValueChange={(v) => setRotation(v[0])}
          min={0}
          max={360}
          step={1}
        />
      </div>

      <Button onClick={getCroppedImg}>Crop Image</Button>
    </div>
  );
}

/* ✅ نسخه‌ی اصلاح‌شده‌ی تابع کراپ */
function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.crossOrigin = 'anonymous'; // لازم برای کراپ از base64
    image.src = url;
  });
}

async function getCroppedImage(imageSrc, crop, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const radians = (rotation * Math.PI) / 180;
  const sin = Math.abs(Math.sin(radians));
  const cos = Math.abs(Math.cos(radians));

  const newWidth = image.width * cos + image.height * sin;
  const newHeight = image.width * sin + image.height * cos;

  canvas.width = newWidth;
  canvas.height = newHeight;

  // چرخاندن تصویر وسط محور
  ctx.translate(newWidth / 2, newHeight / 2);
  ctx.rotate(radians);
  ctx.drawImage(image, -image.width / 2, -image.height / 2);
  ctx.rotate(-radians);
  ctx.translate(-newWidth / 2, -newHeight / 2);

  // برش از ناحیه‌ی کراپ
  const data = ctx.getImageData(crop.x, crop.y, crop.width, crop.height);

  // ایجاد بوم نهایی با اندازه‌ی کراپ‌شده
  const outCanvas = document.createElement('canvas');
  outCanvas.width = crop.width;
  outCanvas.height = crop.height;
  const outCtx = outCanvas.getContext('2d');
  outCtx.putImageData(data, 0, 0);

  return outCanvas.toDataURL('image/jpeg');
}
