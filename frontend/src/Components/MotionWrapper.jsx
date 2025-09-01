import { motion } from "framer-motion";

const MotionWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25, ease: "easeInOut" }}
    style={{ minHeight: "100vh" }}
  >
    {children}
  </motion.div>
);

export default MotionWrapper;
//wwertwetr