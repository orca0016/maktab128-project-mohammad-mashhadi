"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { IoIosArrowDown } from "react-icons/io";

const DropDownButton = () => {
  return (
    <>
      <Dropdown classNames={{
            content: " dark:bg-gray-dark/70 bg-white  dark:text-white text-gray-dark bg-shadow-drawer backdrop-md",
          }}>
          <DropdownTrigger>
            <Button
              disableRipple
              className="p-0 bg-transparent data-[hover=true]:bg-transparent"
              endContent={<IoIosArrowDown />}
              radius="sm"
              variant="light"
            >
              محصولات
            </Button>
          </DropdownTrigger>

        <DropdownMenu
          aria-label="ACME features"
          
          itemClasses={{
            base: "gap-4  ",
          }}
        >
          <DropdownItem
            key="autoscaling"
            description="ACME scales apps based on demand and load"
            // startContent={icons.scale}
          >
            Autoscaling
          </DropdownItem>
          <DropdownItem
            key="usage_metrics"
            description="Real-time metrics to debug issues"
            // startContent={icons.activity}
          >
            Usage Metrics
          </DropdownItem>
          <DropdownItem
            key="production_ready"
            description="ACME runs on ACME, join us at web scale"
            // startContent={icons.flash}
          >
            Production Ready
          </DropdownItem>
          <DropdownItem
            key="99_uptime"
            description="High availability and uptime guarantees"
            // startContent={icons.server}
          >
            +99% Uptime
          </DropdownItem>
          <DropdownItem
            key="supreme_support"
            description="Support team ready to respond"
            // startContent={icons.user}
          >
            +Supreme Support
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default DropDownButton;
