import { User, ShieldCheck, Bell, LogOut, ChevronRight } from 'lucide-react';

interface SettingsViewProps {
  onBack: () => void;
}

export function SettingsView({ onBack }: SettingsViewProps) {
  const sections = [
    {
      title: 'Tài khoản',
      items: [
        { icon: User, label: 'Thông tin cá nhân', value: 'Hi Brother' },
        { icon: Bell, label: 'Thông báo', value: 'Bật' },
      ],
    },
    {
      title: 'Bảo mật',
      items: [
        { icon: ShieldCheck, label: 'Xác thực 2 lớp', value: 'Đã tắt' },
      ],
    },
  ];

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 animate-fade-in">
      <div className="flex items-center justify-between mb-12">
        <h1 className="font-headline text-4xl text-primary font-bold">Cài đặt</h1>
        <button 
          onClick={onBack}
          className="text-primary font-bold hover:underline"
        >
          Quay lại
        </button>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.title} className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm">
            <h3 className="font-headline text-xl font-bold text-primary mb-6">{section.title}</h3>
            <div className="space-y-4">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center justify-between py-4 border-b border-outline-variant/10 last:border-0 cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-surface-container-low rounded-xl group-hover:bg-secondary-container transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-outline font-bold">{item.value}</span>
                      <ChevronRight className="h-4 w-4 text-outline" />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <button className="w-full py-4 bg-error-container text-on-error-container rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <LogOut className="h-5 w-5" />
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
