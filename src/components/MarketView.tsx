import { Product } from '../types';
import { ShoppingCart, Star, Filter, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import type { MouseEvent } from 'react';

interface MarketViewProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function MarketView({ products, onAddToCart }: MarketViewProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('Tất cả');
  const [justAddedProductId, setJustAddedProductId] = useState<string | null>(null);
  const baseMinPrice = 0;
  const baseMaxPrice = Math.max(...products.map((p) => p.price), 2000000);
  const [selectedMinPrice, setSelectedMinPrice] = useState<number>(baseMinPrice);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(baseMaxPrice);

  const categories = ['Cây cảnh', 'Phân bón', 'Đất trồng', 'Chậu cây', 'Dụng cụ'];
  const regions = ['Tất cả', 'Bắc', 'Trung', 'Nam'];

  const filteredProducts = products.filter(p => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const regionMatch = selectedRegion === 'Tất cả' || p.region === selectedRegion;
    const priceMatch = p.price >= selectedMinPrice && p.price <= selectedMaxPrice;
    return categoryMatch && regionMatch && priceMatch;
  });

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>, product: Product) => {
    event.preventDefault();
    event.stopPropagation();
    onAddToCart(product);
    setJustAddedProductId(product.id);
    window.setTimeout(() => {
      setJustAddedProductId((prev) => (prev === product.id ? null : prev));
    }, 1200);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 py-6 md:py-12 animate-fade-in font-body">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 shrink-0 space-y-8 lg:space-y-10">
        <section>
          <h3 className="font-headline text-lg md:text-xl font-bold mb-4 md:mb-6 text-primary">Danh mục</h3>
          <div className="flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full lg:rounded-none lg:px-0 lg:py-0 border lg:border-none transition-all flex items-center gap-3 ${
                  selectedCategories.includes(cat)
                    ? 'bg-primary text-on-primary border-primary lg:bg-transparent lg:text-primary'
                    : 'bg-surface-container-low text-on-surface border-transparent lg:bg-transparent lg:text-on-surface'
                }`}
              >
                <input 
                  type="checkbox" 
                  checked={selectedCategories.includes(cat)}
                  readOnly
                  className="hidden lg:block rounded border-outline-variant text-primary focus:ring-primary w-5 h-5 transition-all cursor-pointer" 
                />
                <span className={`font-medium text-sm md:text-base ${selectedCategories.includes(cat) ? 'lg:font-bold' : ''}`}>
                  {cat}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="hidden md:block">
          <h3 className="font-headline text-xl font-bold mb-6 text-primary">Khu vực ship</h3>
          <div className="grid grid-cols-2 gap-2">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                  selectedRegion === region 
                    ? 'bg-primary text-on-primary border-primary' 
                    : 'bg-surface-container-low text-on-surface border-transparent hover:border-outline-variant'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </section>

        <section className="hidden md:block">
          <h3 className="font-headline text-xl font-bold mb-6 text-primary">Khoảng giá</h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1 text-[10px] uppercase tracking-widest text-outline font-bold">
                <span>Từ</span>
                <span>{selectedMinPrice.toLocaleString('vi-VN')}đ</span>
              </div>
              <input
                type="range"
                min={baseMinPrice}
                max={baseMaxPrice}
                step={5000}
                value={selectedMinPrice}
                onChange={(e) => {
                  const nextMin = Number(e.target.value);
                  setSelectedMinPrice(Math.min(nextMin, selectedMaxPrice));
                }}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1 text-[10px] uppercase tracking-widest text-outline font-bold">
                <span>Đến</span>
                <span>{selectedMaxPrice.toLocaleString('vi-VN')}đ</span>
              </div>
              <input
                type="range"
                min={baseMinPrice}
                max={baseMaxPrice}
                step={5000}
                value={selectedMaxPrice}
                onChange={(e) => {
                  const nextMax = Number(e.target.value);
                  setSelectedMaxPrice(Math.max(nextMax, selectedMinPrice));
                }}
                className="w-full accent-primary"
              />
            </div>
          </div>
          <div className="flex justify-between mt-3 text-xs text-outline font-bold">
            <span>{baseMinPrice.toLocaleString('vi-VN')}đ</span>
            <span>{baseMaxPrice.toLocaleString('vi-VN')}đ</span>
          </div>
        </section>

        <div className="bg-primary-container p-6 md:p-8 rounded-[32px] text-on-primary shadow-xl">
           <p className="font-headline text-lg md:text-xl leading-snug mb-4 italic">Tham gia Collectors' Circle để nhận ưu đãi cây hiếm.</p>
           <button className="w-full py-3 bg-white text-primary font-bold rounded-xl text-sm hover:bg-surface transition-colors shadow-sm active:scale-95 transition-all">Tìm hiểu thêm</button>
        </div>
      </aside>

      {/* Product Grid */}
      <main className="flex-1 space-y-8 md:space-y-12">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary">Mùa hè Việt Nam</h2>
            <p className="text-xs md:text-sm text-outline italic">Sưu tập các loại cây chịu nhiệt & chăm sóc mùa nóng</p>
          </div>
          <button className="md:flex hidden items-center gap-2 text-sm font-bold text-outline hover:text-primary transition-colors bg-surface-container-low px-4 py-2 rounded-xl">
            <Filter className="h-4 w-4" />
            Sắp xếp
          </button>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -8 }}
              className="group bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                {product.tag && (
                  <span className="absolute top-4 left-4 bg-tertiary-fixed text-on-tertiary-fixed-variant px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {product.tag}
                  </span>
                )}
                {product.region && (
                  <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-primary flex items-center gap-1 shadow-sm">
                    <MapPin className="h-3 w-3" />
                    {product.region}
                  </span>
                )}
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-headline text-lg font-bold text-primary leading-tight">{product.name}</h3>
                  <span className="font-bold text-lg whitespace-nowrap">{product.price.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-[10px] text-outline font-bold">({product.reviews})</span>
                </div>
                <button 
                  type="button"
                  onClick={(event) => handleAddToCart(event, product)}
                  className="w-full py-4 botanical-gradient text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/10 group-hover:scale-[1.02] transition-transform active:scale-95"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {justAddedProductId === product.id ? 'Đã thêm' : 'Thêm vào giỏ'}
                </button>
              </div>
            </motion.div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-24 text-center">
              <p className="text-outline font-bold">Không tìm thấy sản phẩm phù hợp.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
