import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Eye, EyeOff, User, Lock, AlertCircle } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/sections/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username atau email harus diisi';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password harus diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Placeholder for actual login logic
      console.log('Login attempt:', formData);
      alert('Fitur login sedang dalam pengembangan. Silakan hubungi admin sekolah.');
    }
  };

  return (
    <>
      <SEO 
        title="Login - SMA Katolik St. Louis 1 Surabaya"
        description="Login ke sistem informasi SMA Katolik St. Louis 1 Surabaya untuk mengakses portal siswa, orang tua, dan staff."
        keywords="login, portal siswa, sistem informasi sekolah, akses SMA St. Louis 1"
      />

      <div className="min-h-screen pt-20 flex items-center">
        <Section className="flex-1">
          <SectionHeader>
            <SectionTitle>
              Login 
              <span className="gradient-text">Portal</span>
            </SectionTitle>
            <SectionDescription>
              Masuk ke sistem informasi SMA Katolik St. Louis 1 Surabaya 
              untuk mengakses layanan digital sekolah.
            </SectionDescription>
          </SectionHeader>

          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-school-secondary/50 border-school-accent/20">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-school-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LogIn className="w-8 h-8 text-school-accent" />
                  </div>
                  <CardTitle className="text-school-text">Masuk ke Akun Anda</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username Field */}
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-school-text mb-2">
                        Username atau Email
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-school-text-muted w-5 h-5" />
                        <Input
                          id="username"
                          name="username"
                          type="text"
                          value={formData.username}
                          onChange={handleInputChange}
                          placeholder="Masukkan username atau email"
                          className={`pl-10 bg-school-primary/50 border-school-accent/20 ${
                            errors.username ? 'border-red-500' : ''
                          }`}
                        />
                      </div>
                      {errors.username && (
                        <div className="flex items-center mt-1 text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.username}
                        </div>
                      )}
                    </div>

                    {/* Password Field */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-school-text mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-school-text-muted w-5 h-5" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Masukkan password"
                          className={`pl-10 pr-10 bg-school-primary/50 border-school-accent/20 ${
                            errors.password ? 'border-red-500' : ''
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-school-text-muted hover:text-school-accent"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.password && (
                        <div className="flex items-center mt-1 text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.password}
                        </div>
                      )}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-school-accent/20 text-school-accent focus:ring-school-accent focus:ring-offset-0"
                        />
                        <span className="ml-2 text-sm text-school-text-muted">Ingat saya</span>
                      </label>
                      <button
                        type="button"
                        className="text-sm text-school-accent hover:text-school-accent-dark transition-colors"
                      >
                        Lupa password?
                      </button>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-school-accent hover:bg-school-accent-dark text-school-primary font-semibold"
                    >
                      Masuk
                    </Button>
                  </form>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-school-accent/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-school-secondary text-school-text-muted">atau</span>
                    </div>
                  </div>

                  {/* Alternative Login Options */}
                  <div className="space-y-3">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full border-school-accent/20 text-school-text hover:bg-school-accent/5"
                      disabled
                    >
                      Login dengan Google (Segera Hadir)
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full border-school-accent/20 text-school-text hover:bg-school-accent/5"
                      disabled
                    >
                      Login dengan Microsoft (Segera Hadir)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Help Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-center"
            >
              <div className="bg-school-secondary/30 rounded-xl p-6 border border-school-accent/20">
                <h3 className="text-lg font-semibold text-school-text mb-2">
                  Butuh Bantuan?
                </h3>
                <p className="text-school-text-muted text-sm mb-4">
                  Hubungi admin sekolah untuk mendapatkan akun atau reset password
                </p>
                <div className="space-y-2 text-sm text-school-text-muted">
                  <p>📞 (031) 5676522, 5677494, 5681758</p>
                  <p>✉️ info@smakstlouis1sby.sch.id</p>
                  <p>🕒 Senin-Jumat 07.00-15.00, Sabtu 07.00-12.00</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
    </>
  );
}