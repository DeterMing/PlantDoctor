import { Product } from '../types';
import { ShoppingCart, Star, Filter, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface MarketViewProps {
  products: Product[];
}

export function MarketView({ products }: MarketViewProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('Tất cả');

  const categories = ['Cây cảnh', 'Phân bón', 'Đất trồng', 'Chậu cây', 'Dụng cụ'];
  const regions = ['Tất cả', 'Bắc', 'Trung', 'Nam'];

  const filteredProducts = products.filter(p => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const regionMatch = selectedRegion === 'Tất cả' || p.region === selectedRegion;
    return categoryMatch && regionMatch;
  });

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 py-12 animate-fade-in">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 shrink-0 space-y-10">
        <section>
          <h3 className="font-headline text-xl font-bold mb-6 text-primary">Danh mục</h3>
          <div className="space-y-4">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5 transition-all" 
                />
                <span className={`group-hover:text-primary transition-colors font-medium ${selectedCategories.includes(cat) ? 'text-primary font-bold' : 'text-on-surface'}`}>
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </section>

        <section>
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

        <section>
          <h3 className="font-headline text-xl font-bold mb-6 text-primary">Khoảng giá</h3>
          <input type="range" className="w-full accent-primary" />
          <div className="flex justify-between mt-2 text-xs text-outline font-bold">
            <span>0đ</span>
            <span>2.000.000đ+</span>
          </div>
        </section>

        <div className="bg-primary-container p-8 rounded-3xl text-on-primary shadow-xl">
           <p className="font-headline text-xl leading-snug mb-4 italic">Tham gia Collectors' Circle để nhận ưu đãi cây hiếm.</p>
           <button className="w-full py-3 bg-white text-primary font-bold rounded-xl text-sm hover:bg-surface transition-colors">Tìm hiểu thêm</button>
        </div>
      </aside>

      {/* Product Grid */}
      <main className="flex-1 space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="font-headline text-3xl font-bold text-primary">Mùa hè Việt Nam</h2>
            <p className="text-sm text-outline italic">Sưu tập các loại cây chịu nhiệt và phụ kiện chăm sóc mùa nóng</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-outline hover:text-primary transition-colors bg-surface-container-low px-4 py-2 rounded-xl">
            <Filter className="h-4 w-4" />
            Sắp xếp: Phổ biến
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
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
                <button className="w-full py-4 botanical-gradient text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/10 group-hover:scale-[1.02] transition-transform">
                  <ShoppingCart className="h-4 w-4" />
                  Thêm vào giỏ
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
