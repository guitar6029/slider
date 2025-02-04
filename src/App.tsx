import { useState, useCallback } from 'react';
import { dummyData } from './dummyData/data';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './App.css';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);


  /**
   * Handle change slide
   */
  const handleChangeSlide = useCallback((direction: number) => {
    let newIndex = currentSlide + direction;
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= dummyData.length) newIndex = dummyData.length - 1;
    setCurrentSlide(newIndex);
  }, [currentSlide]);

  return (
    <div className="flex w-full flex-col gap-3 min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-5xl p-4 relative">
        <span className="text-4xl font-bold text-black">Check out these items</span>
        <div className="relative flex items-center justify-center mt-4 overflow-hidden">
          <ArrowLeft
            size={80}
            className={`cursor-pointer absolute left-0 z-10 text-black bg-white p-2 rounded-full shadow-lg ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleChangeSlide(-1)}
          />
          <div className="flex overflow-hidden w-full">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)`, width: `${dummyData.length * 100}%` }}>
              {dummyData.map((item) => (
                <div
                  key={item.productID}
                  className="shadow-lg flex flex-col gap-9 justify-center items-center p-4 box-border rounded-lg"
                  style={{ minWidth: '100%', height: '900px' }}
                >
                  {item.imageMain ? (
                    <img className="w-full h-3/4 object-contain rounded-full" src={item.imageMain} alt={item.productName} />
                  ) : (
                    <div className="w-full h-3/4 flex items-center justify-center bg-gray-200">
                      <span className="text-lg font-bold text-gray-500">Image Not Available</span>
                    </div>
                  )}
                  <span className="sm:text-sm lg:text-lg font-bold text-black">{item.category}</span>
                  <span className="sm:text-sm lg:text-2xl text-black font-bold">{item.productName} 123</span>
                  <div className="flex flex-col gap-2 w-full">
                    <span className="text-xl lg:text-2xl text-black font-bold">${item.price}</span>
                    <hr />
                    <button className="p-2 rounded-lg cursor-pointer text-white">Buy Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ArrowRight
            size={80}
            className={`cursor-pointer absolute right-0 z-10 text-black bg-white p-2 rounded-full shadow-lg ${currentSlide === dummyData.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleChangeSlide(1)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
