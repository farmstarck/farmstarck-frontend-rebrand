import Navigation from "@/components/common/MarketPlace/Navigation";

interface CategoryHeaderProps {
  categoryName: string;
  categorySlug: string;
}

export const CategoryHeader = ({
  categoryName,
  categorySlug,
}: CategoryHeaderProps) => {
  return (
    <div>
      <Navigation
        routes={[
          { name: categoryName, href: `/market/marketplace/${categorySlug}` },
        ]}
      />

      <div className="my-6 text-2xl font-extrabold capitalize text-dark-green">
        {categoryName}
      </div>
    </div>
  );
};
