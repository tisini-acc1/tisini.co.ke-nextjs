"use client";
import { TisiniOrganizationInterface } from "@/app/api/models/organization/organization.interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type OrganizationCardProps = {
  organization: TisiniOrganizationInterface&{
    _id:string
  }
};

export default function OrganizationCard({
  organization,
}: OrganizationCardProps) {
  return (
    <div className="border">
      <div>
        <Image
          src={organization.org_logo!}
          alt={organization._id}
          width={500}
          height={500}
          className="object-cover h-44 w-full"
        />
      </div>
      <div className="p-2 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{organization.organization_name}</h1>
        <p>Organization description</p>
        <div className="flex w-full flex-col">
          <Link
            href={`/organizations/${organization.organization_name}`}
            className="bg-primary text-white p-2 rounded-md px-4 text-center"
          >
            View Questionsets
          </Link>
        </div>
      </div>
    </div>
  );
}
