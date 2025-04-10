import { ChartBarIcon } from "@heroicons/react/24/outline";
import { motion } from 'framer-motion';

export const Dashboard = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-82px)] bg-gradient-to-b from-background to-muted p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto p-8 rounded-2xl bg-background/50 backdrop-blur-sm shadow-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto w-24 h-24 mb-6 text-[#066320]"
        >
          <ChartBarIcon className="w-full h-full" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold mb-4 text-foreground font-['Sora']"
        >
          Dashboard Coming Soon
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <p className="text-lg text-muted-foreground font-['Montserrat']">
            We're building a powerful dashboard to help you track and analyze startup ecosystem metrics. Stay tuned for comprehensive insights and analytics.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};