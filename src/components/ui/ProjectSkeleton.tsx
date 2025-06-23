import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export const ProjectSkeleton: React.FC = () => (
  <div className="w-full bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] rounded-2xl shadow-lg" aria-label="Carregando projeto">
    {/* Content Skeleton */}
    <div className="flex flex-col gap-4 w-full p-6 lg:p-8">
      {/* Image Skeleton */}
      <Skeleton height={240} className="w-full rounded-lg" />
      
      {/* Category */}
      <Skeleton width={100} height={20} className="w-fit" />
      
      {/* Title */}
      <Skeleton height={32} className="w-full" />
      
      {/* Description */}
      <Skeleton count={3} height={16} className="w-full" />
      
      {/* Tags */}
      <div className="flex gap-2 w-full">
        <Skeleton width={60} height={24} borderRadius={9999} />
        <Skeleton width={80} height={24} borderRadius={9999} />
        <Skeleton width={70} height={24} borderRadius={9999} />
      </div>
      
      {/* Button */}
      <Skeleton width={120} height={40} borderRadius={8} className="w-fit" />
    </div>
  </div>
);

export const ProfileSkeleton: React.FC = () => (
  <div className="text-center" aria-label="Carregando perfil">
    {/* Profile Image */}
    <div className="mb-6">
      <Skeleton circle height={128} width={128} className="mx-auto" />
    </div>
    
    {/* Name */}
    <Skeleton height={40} width={300} className="mb-4 mx-auto" />
    
    {/* Title */}
    <Skeleton height={24} width={200} className="mb-6 mx-auto" />
    
    {/* Bio */}
    <div className="max-w-2xl mx-auto">
      <Skeleton count={3} height={20} className="mb-2" />
    </div>
    
    {/* Buttons */}
    <div className="flex gap-4 justify-center mt-8">
      <Skeleton height={44} width={120} borderRadius={8} />
      <Skeleton height={44} width={120} borderRadius={8} />
    </div>
  </div>
);

export const BacklogSkeleton: React.FC = () => (
  <div className="space-y-6" aria-label="Carregando backlogs">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="border rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <Skeleton circle height={48} width={48} />
          <div className="flex-1">
            <Skeleton height={24} width={200} className="mb-2" />
            <Skeleton height={16} width={150} />
          </div>
        </div>
        
        {/* Content */}
        <Skeleton count={2} height={16} className="mb-2" />
        
        {/* Tags */}
        <div className="flex gap-2 mt-4">
          <Skeleton width={80} height={20} borderRadius={10} />
          <Skeleton width={100} height={20} borderRadius={10} />
          <Skeleton width={60} height={20} borderRadius={10} />
        </div>
      </div>
    ))}
  </div>
);

export const ContactSkeleton: React.FC = () => (
  <div className="max-w-4xl mx-auto" aria-label="Carregando formulário de contato">
    {/* Header */}
    <div className="mb-8 text-center">
      <Skeleton height={40} width={300} className="mx-auto mb-4" />
      <Skeleton height={20} width={500} className="mx-auto mb-2" />
      <Skeleton height={20} width={400} className="mx-auto" />
    </div>
    
    {/* Form */}
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
      {/* Form Fields */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Skeleton height={20} width={100} className="mb-2" />
            <Skeleton height={40} />
          </div>
          <div>
            <Skeleton height={20} width={100} className="mb-2" />
            <Skeleton height={40} />
          </div>
        </div>
        
        <div>
          <Skeleton height={20} width={100} className="mb-2" />
          <Skeleton height={40} />
        </div>
        
        <div>
          <Skeleton height={20} width={100} className="mb-2" />
          <Skeleton height={120} />
        </div>
        
        {/* Button */}
        <Skeleton height={50} width={200} className="mt-4" />
      </div>
    </div>
  </div>
);

export default ProjectSkeleton;
