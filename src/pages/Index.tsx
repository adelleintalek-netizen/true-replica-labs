import WorksSection from "@/components/WorksSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Spacer to demonstrate scroll */}
      <div className="h-[50vh] flex items-center justify-center">
        <p className="works-subtitle text-center">Scroll down to see the works section</p>
      </div>
      
      <WorksSection />
      
      {/* Spacer at bottom */}
      <div className="h-[50vh]" />
    </div>
  );
};

export default Index;
