import { FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Kontak() {
  const iconClass = "text-yellow-400 text-xl mr-4 mt-1";

  return (
    <section className="bg-gradient-to-b from-gray-900 via-black to-black text-white py-20 px-6 md:px-20 font-serif">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Kontak & Lokasi</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Punya pertanyaan atau ingin booking layanan kami? Hubungi kami atau langsung datang ke lokasi kami!
          </p>
        </motion.div>

        {/* Konten: Kontak + Peta */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Info Kontak */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm"
          >
            <h3 className="text-2xl font-semibold mb-6 text-yellow-400">Hubungi Kami</h3>
            <ul className="space-y-6 text-gray-200 text-base md:text-lg">
              <li className="flex items-start">
                <FaMapMarkerAlt className={iconClass} />
                <span>
                  Jl. Asia No.43<br />
                  Medan, Indonesia 20222
                </span>
              </li>
              <li className="flex items-start">
                <FaPhoneAlt className={iconClass} />
                <a href="tel:+62821706790" className="hover:text-yellow-500 transition duration-200">
                  +62 821 706 790
                </a>
              </li>
              <li className="flex items-start">
                <FaPaperPlane className={iconClass} />
                <a
                  href="mailto:dimensihairmedan@gmail.com"
                  className="hover:text-yellow-500 transition duration-200 break-all"
                >
                  dimensihairmedan@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Peta Lokasi */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-xl border-2 border-yellow-400"
          >
            <iframe
              title="Peta Lokasi DimensiHairStudio"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.117300764143!2d98.666372!3d3.581141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312e2469249b67%3A0xe0b0d7026d997f0b!2sJl.%20Asia%20No.43%2C%20Medan!5e0!3m2!1sen!2sid!4v1719400000000!5m2!1sen!2sid"
              className="w-full h-[400px] border-0"
              loading="lazy"
              allowFullScreen
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
