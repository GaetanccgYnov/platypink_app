<template>
<title>Tattoos</title>
<body class="bg-gray-100 font-montserrat">
<div class="p-4" id="app">
    <div class="flex">
        <!-- Sidebar -->
        <div class="w-1/4 p-4 bg-white rounded-lg shadow">
            <div class="mb-4">
                <h2 class="text-lg font-semibold mb-2">
                    Keywords
                </h2>
                <div class="flex flex-wrap gap-2">
       <span class="bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
        Spring
        <i class="fas fa-times ml-1">
        </i>
       </span>
                    <span class="bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
        Smart
        <i class="fas fa-times ml-1">
        </i>
       </span>
                    <span class="bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
        Modern
        <i class="fas fa-times ml-1">
        </i>
       </span>
                </div>
            </div>
            <div class="mb-4">
                <h2 class="text-lg font-semibold mb-2">
                    Label
                </h2>
                <div class="space-y-2">
                    <div class="flex items-center">
                        <input class="form-checkbox h-4 w-4 text-gray-600" type="checkbox"/>
                        <span class="ml-2 text-gray-700">
         Label Description
        </span>
                    </div>
                    <div class="flex items-center">
                        <input class="form-checkbox h-4 w-4 text-gray-600" type="checkbox"/>
                        <span class="ml-2 text-gray-700">
         Label Description
        </span>
                    </div>
                    <div class="flex items-center">
                        <input class="form-checkbox h-4 w-4 text-gray-600" type="checkbox"/>
                        <span class="ml-2 text-gray-700">
         Label Description
        </span>
                    </div>
                </div>
            </div>
            <div class="mb-4">
                <h2 class="text-lg font-semibold mb-2">
                    Label
                </h2>
                <input class="w-full" max="100" min="0" type="range"/>
                <div class="flex justify-between text-gray-600">
       <span>
        $0
       </span>
                    <span>
        $100
       </span>
                </div>
            </div>
            <div class="mb-4">
                <h2 class="text-lg font-semibold mb-2">
                    Color
                </h2>
                <div class="space-y-2">
                    <div class="flex items-center">
                        <input class="form-checkbox h-4 w-4 text-gray-600" type="checkbox"/>
                        <span class="ml-2 text-gray-700">
         Label
        </span>
                    </div>
                    <div class="flex items-center">
                        <input class="form-checkbox h-4 w-4 text-gray-600" type="checkbox"/>
                        <span class="ml-2 text-gray-700">
         Label
        </span>
                    </div>
                    <div class="flex items-center">
                        <input class="form-checkbox h-4 w-4 text-gray-600" type="checkbox"/>
                        <span class="ml-2 text-gray-700">
         Label
        </span>
                    </div>
                </div>
            </div>
            <div class="mb-4">
                <h2 class="text-lg font-semibold mb-2">
                    Size
                </h2>
                <div class="space-y-2">
                    <div class="flex items-center">
                        <input class="form-checkbox h-4 w-4 text-gray-600" type="checkbox"/>
                        <span class="ml-2 text-gray-700">
         Label
        </span>
                    </div>
                    <div class="flex items-center">
                        <input class="form-checkbox h-4 w-4 text-gray-600" type="checkbox"/>
                        <span class="ml-2 text-gray-700">
         Label
        </span>
                    </div>
                    <div class="flex items-center">
                        <input class="form-checkbox h-4 w-4 text-gray-600" type="checkbox"/>
                        <span class="ml-2 text-gray-700">
         Label
        </span>
                    </div>
                </div>
            </div>
        </div>
        <!-- Main Content -->
        <div class="w-3/4 p-4">
            <div class="flex items-center mb-4">
                <input class="flex-grow p-2 border border-gray-300 rounded-lg" placeholder="Search" type="text"/>
                <button class="ml-2 p-2 bg-gray-200 rounded-lg">
                    <i class="fas fa-search">
                    </i>
                </button>
                <button class="ml-4 p-2 bg-black text-white rounded-lg flex items-center">
                    <i class="fas fa-plus mr-2">
                    </i>
                    New
                </button>
                <button class="ml-2 p-2 bg-gray-200 rounded-lg">
                    Price ascending
                </button>
                <button class="ml-2 p-2 bg-gray-200 rounded-lg">
                    Price descending
                </button>
                <button class="ml-2 p-2 bg-gray-200 rounded-lg">
                    Rating
                </button>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-lg shadow">
                    <img alt="Placeholder image" class="w-full h-48 object-cover rounded-lg mb-2" height="200" src="https://storage.googleapis.com/a1aa/image/lhuB11epCqRqMCfmY82nObERXftPK4tjY0ONfN5C8GZgN6fdC.jpg" width="200"/>
                    <div class="text-center">
                        <p class="text-gray-700">
                            Text
                        </p>
                        <p class="text-gray-500">
                            $0
                        </p>
                    </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow">
                    <img alt="Placeholder image" class="w-full h-48 object-cover rounded-lg mb-2" height="200" src="https://storage.googleapis.com/a1aa/image/lhuB11epCqRqMCfmY82nObERXftPK4tjY0ONfN5C8GZgN6fdC.jpg" width="200"/>
                    <div class="text-center">
                        <p class="text-gray-700">
                            Text
                        </p>
                        <p class="text-gray-500">
                            $0
                        </p>
                    </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow">
                    <img alt="Placeholder image" class="w-full h-48 object-cover rounded-lg mb-2" height="200" src="https://storage.googleapis.com/a1aa/image/lhuB11epCqRqMCfmY82nObERXftPK4tjY0ONfN5C8GZgN6fdC.jpg" width="200"/>
                    <div class="text-center">
                        <p class="text-gray-700">
                            Text
                        </p>
                        <p class="text-gray-500">
                            $0
                        </p>
                    </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow">
                    <img alt="Placeholder image" class="w-full h-48 object-cover rounded-lg mb-2" height="200" src="https://storage.googleapis.com/a1aa/image/lhuB11epCqRqMCfmY82nObERXftPK4tjY0ONfN5C8GZgN6fdC.jpg" width="200"/>
                    <div class="text-center">
                        <p class="text-gray-700">
                            Text
                        </p>
                        <p class="text-gray-500">
                            $0
                        </p>
                    </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow">
                    <img alt="Placeholder image" class="w-full h-48 object-cover rounded-lg mb-2" height="200" src="https://storage.googleapis.com/a1aa/image/lhuB11epCqRqMCfmY82nObERXftPK4tjY0ONfN5C8GZgN6fdC.jpg" width="200"/>
                    <div class="text-center">
                        <p class="text-gray-700">
                            Text
                        </p>
                        <p class="text-gray-500">
                            $0
                        </p>
                    </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow">
                    <img alt="Placeholder image" class="w-full h-48 object-cover rounded-lg mb-2" height="200" src="https://storage.googleapis.com/a1aa/image/lhuB11epCqRqMCfmY82nObERXftPK4tjY0ONfN5C8GZgN6fdC.jpg" width="200"/>
                    <div class="text-center">
                        <p class="text-gray-700">
                            Text
                        </p>
                        <p class="text-gray-500">
                            $0
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex justify-between items-center mt-4">
                <button class="p-2 bg-gray-200 rounded-lg">
                    <i class="fas fa-chevron-left">
                    </i>
                    Previous
                </button>
                <div class="flex space-x-2">
                    <button class="p-2 bg-black text-white rounded-lg">
                        1
                    </button>
                    <button class="p-2 bg-gray-200 rounded-lg">
                        2
                    </button>
                    <button class="p-2 bg-gray-200 rounded-lg">
                        3
                    </button>
                    <span class="p-2">
        ...
       </span>
                    <button class="p-2 bg-gray-200 rounded-lg">
                        67
                    </button>
                    <button class="p-2 bg-gray-200 rounded-lg">
                        68
                    </button>
                </div>
                <button class="p-2 bg-gray-200 rounded-lg">
                    Next
                    <i class="fas fa-chevron-right">
                    </i>
                </button>
            </div>
        </div>
    </div>
</div>
</body>
</template>