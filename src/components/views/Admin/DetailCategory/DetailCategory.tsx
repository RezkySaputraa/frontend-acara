"use client";

import { Tabs, Tab } from "@heroui/tabs";
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";
import useDetailCategory from "./useDetailCategory";

const DetailCategory = () => {
  const {
    dataCategory,
    handleUpdateCategory,
    isPendingMutateUpdateCategory,
    isSuccessMutateUpdateCategory,
  } = useDetailCategory();

  return (
    <Tabs aria-label="Options">
      <Tab key="icon" title="Icon">
        <IconTab
          currentIcon={dataCategory?.icon}
          onUpdate={handleUpdateCategory}
          isPendingUpdate={isPendingMutateUpdateCategory}
          isSuccessUpdate={isSuccessMutateUpdateCategory}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataCategory={dataCategory}
          onUpdate={handleUpdateCategory}
          isPendingUpdate={isPendingMutateUpdateCategory}
          isSuccessUpdate={isSuccessMutateUpdateCategory}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailCategory;
