import type { IProduct } from "@/types/product.interface";

const MoreInfo = ({ product }: { product: IProduct }) => {
  return (
    <div>
      <p>اطلاعات بیشتر :</p>
      <hr />
      <main>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>وزن</p>
          <p>{product.weight} گرم</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>مناسب برای</p>
          <p>{product.suitableFor}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>میزان بو</p>
          <p>{product.smell}</p>
        </div>
      </main>
    </div>
  );
};

export default MoreInfo;
